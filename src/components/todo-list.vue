<template>
  <div class="todo-list">
    <span class="todo-list-title">Things to do:</span>
    <div v-if="todos.length" class="todo-list-content">
      <TodoCheckbox
        v-for="todoItem in todos"
        :key="todoItem.id"
        :label="todoItem.label"
        :checked="todoItem.checked"
        @click="() => toggleCheck(todoItem.id)"
        @key-up="(e) => handleKeyUp(e, todoItem.id)"
        @delete="() => handleDelete(todoItem.id)"
      />
    </div>
    <div v-else class="no-todos">No todos yet</div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { defineComponent } from "vue";
import TodoCheckbox from "./todo-checkbox.vue";
import useTodos from "@/composables/useTodos";

export default defineComponent({
  name: "TodoList",

  components: { TodoCheckbox },

  emits: ["todos-changed"],

  setup(props, { emit }) {
    const { todos } = useTodos();

    const toggleCheck = (id) => {
      emit(
        "todos-changed",
        todos.value.map((el) => {
          if (el.id === id) {
            return {
              ...el,
              checked: !el.checked,
            };
          }

          return el;
        }),
      );
    };

    const handleDelete = (id) => {
      emit(
        "todos-changed",
        todos.value.filter((el) => el.id !== id),
      );
    };

    const handleKeyUp = (e, id) => {
      if (e.keyCode === 13) {
        toggleCheck(id);
      }
    };

    return {
      toggleCheck,
      handleDelete,
      handleKeyUp,
      todos,
    };
  },
});
</script>

<style scoped>
.todo-list {
  padding: 10px 0;
  border-bottom: 1px solid rgba(1, 1, 1, 0.1);
}

.todo-list-title {
  font-weight: 500;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  display: block;
  border-bottom: 1px solid rgba(1, 1, 1, 0.1);
  padding: 5px 0;
  margin-bottom: 10px;
}

.todo-list-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.no-todos {
  text-align: center;
  padding: 5px 0;
  font-size: 14px;
  color: gray;
}
</style>

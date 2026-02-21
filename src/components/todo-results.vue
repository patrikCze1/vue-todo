<template>
  <div class="todo-results" :class="{ 'todo-results--green': finishedCount > 0 }">
    {{ finishedCount }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useTodos from "../composables/useTodos";

export default defineComponent({
  name: "TodoResults",

  setup() {
    const { finishedCount } = useTodos();

    return {
      finishedCount,
    };
  },
});
</script>

<style scoped>
.todo-results {
  text-align: center;
  margin: 1rem 0;
  padding-bottom: 1rem;
  color: red;
  border-bottom: 1px solid rgba(1, 1, 1, 0.1);

  &.todo-results--green {
    color: green;
  }
}
</style>

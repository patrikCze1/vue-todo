import { computed, ref } from "vue";

const todos = ref([]);

export default function useTodos() {
  const finishedCount = computed(() => {
    return todos.value.filter((todo) => todo.checked).length;
  });

  function addTodo(newTodo) {
    todos.value = [...todos.value, newTodo];
  }

  function handleTodosChange(newTodos) {
    todos.value = newTodos;
  }

  async function init() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();

      todos.value = data.map((todo) => ({
        id: todo.id,
        label: todo.title,
        checked: todo.completed,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return { finishedCount, addTodo, init, handleTodosChange, todos };
}

import { describe, it, expect, beforeEach, vi } from "vitest";
import useTodos from "./useTodos.js";

describe("useTodos", () => {
  beforeEach(() => {
    const { handleTodosChange } = useTodos();
    handleTodosChange([]);
  });

  it("addTodo appends a todo and updates finishedCount", () => {
    const { addTodo, todos, finishedCount } = useTodos();

    addTodo({ id: 1, label: "Todo 1", checked: false });
    addTodo({ id: 2, label: "Todo 2", checked: true });

    expect(todos.value).toHaveLength(2);
    expect(finishedCount.value).toBe(1);
  });

  it("init fetches todos from the API", async () => {
    const mockTodos = [
      { id: 1, title: "Todo 1", completed: false },
      { id: 2, title: "Todo 2", completed: true },
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockTodos),
    });

    const { init, todos } = useTodos();
    await init();

    expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos");
    expect(todos.value).toEqual([
      { id: 1, label: "Todo 1", checked: false },
      { id: 2, label: "Todo 2", checked: true },
    ]);
  });
});

import { useContext } from "react";
import { TodoListContext } from "../context/TodoListContext";

export default function TodoList() {
  const { todos } = useContext(TodoListContext);

  return (
    <article>
      <h1>할 일 목록</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </article>
  );
}

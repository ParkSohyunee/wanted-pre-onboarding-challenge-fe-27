import { useContext } from "react";
import { TodoListContext } from "../context/TodoListContext";
import { SelectedTodoContext } from "../context/SelectedTodoContext";

export default function TodoList() {
  const { todos } = useContext(TodoListContext);
  const { addItem } = useContext(SelectedTodoContext);

  const handleMoveToTab = (todoId: string) => () => {
    addItem(todoId);
  };

  return (
    <article>
      <h1>할 일 목록</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id} onClick={handleMoveToTab(todo.id)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </article>
  );
}

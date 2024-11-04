import TodoList from "../../components/TodoList";
import TodoContents from "../../components/TodoContents";
import TodoForm from "../../components/TodoForm";

export default function Home() {
  return (
    <section>
      <TodoList />
      <TodoForm />
      <TodoContents />
    </section>
  );
}

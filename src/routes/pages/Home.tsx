import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

export default function Home() {
  return (
    <section>
      <TodoList />
      <TodoForm />
    </section>
  );
}

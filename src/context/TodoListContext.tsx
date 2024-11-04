import { createContext, ReactNode, useEffect, useState } from "react";

import { Todo } from "../types/todo";
import { getTodos } from "../api/todo";

type Context = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  fetchTodos: () => Promise<void>;
};

const TodoListContext = createContext<Context>({
  todos: [],
  addTodo: () => {},
  fetchTodos: async () => {},
});

type ContextProvider = {
  children: ReactNode;
};

const TodoListContextProvider = ({ children }: ContextProvider) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const fetchTodos = async () => {
    const result = await getTodos();
    setTodos(result.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoListContext.Provider value={{ todos, addTodo, fetchTodos }}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListContextProvider };

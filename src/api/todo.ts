import axiosInstance from "./axios";
import { Todo } from "../types/todo";

type TodoType = {
  id: string;
  title: string;
  content: string;
};

const getTodos = async () => {
  const result = await axiosInstance.get<{ data: Todo[] }>("/todos");
  return result.data;
};

const getTodoById = async ({ id }: Pick<TodoType, "id">) => {
  const result = await axiosInstance.get<{ data: Todo }>(`/todos/${id}`);
  return result.data;
};

const createTodo = async ({ title, content }: Omit<TodoType, "id">) => {
  const result = await axiosInstance.post<{ data: Todo }>("/todos", {
    title,
    content,
  });

  return result.data;
};

export { getTodos, getTodoById, createTodo };

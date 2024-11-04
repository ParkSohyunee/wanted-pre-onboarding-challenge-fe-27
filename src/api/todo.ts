import axiosInstance from "./axios";
import { Todo } from "../types/todo";

type TodoType = {
  title: string;
  content: string;
};

const getTodos = async () => {
  const result = await axiosInstance.get<{ data: Todo[] }>("/todos");
  return result.data;
};

const createTodo = async ({ title, content }: TodoType) => {
  const result = await axiosInstance.post<{ data: Todo }>("/todos", {
    title,
    content,
  });

  return result.data;
};

export { getTodos, createTodo };

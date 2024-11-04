import axiosInstance from "./axios";
import { Todo } from "../types/todo";

type TodoType = {
  title: string;
  content: string;
};

type Response = {
  data: Todo;
};

const createTodo = async ({ title, content }: TodoType) => {
  const result = await axiosInstance.post<Response>("/todos", {
    title,
    content,
  });

  return result.data;
};

export { createTodo };

import { useContext } from "react";
import { isAxiosError } from "axios";

import { TodoListContext } from "../context/TodoListContext";
import useForm from "../hooks/useForm";
import { Todo } from "../types/todo";
import { validateTodo } from "../libs/utils/validate";

import { updateTodo } from "../api/todo";

import Label from "./Label";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

type EditTodoFormProps = {
  todoData: Todo;
  onClose: () => void;
};

export default function EditTodoForm({ todoData, onClose }: EditTodoFormProps) {
  const { fetchTodos } = useContext(TodoListContext); // editTodo 추가 필요
  const { values, isBlur, errors, getValuesProps } = useForm({
    initialValue: { title: todoData.title, content: todoData.content },
    validate: validateTodo,
  });

  const handleEditTodo = async () => {
    try {
      await updateTodo({ ...values, id: todoData.id });
      fetchTodos();
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.details);
      }
    }
  };

  return (
    <div>
      <div>
        <Label htmlFor="title">제목</Label>
        <TextInput
          id="title"
          isBlur={isBlur.title}
          placeholder="할 일의 제목을 입력해주세요"
          errorMessage={errors.title}
          defaultValue={values.title}
          {...getValuesProps("title")}
        />
      </div>
      <div>
        <Label htmlFor="content">내용</Label>
        <TextInput
          id="content"
          isBlur={isBlur.content}
          placeholder="할 일의 내용을 입력해주세요"
          errorMessage={errors.content}
          defaultValue={values.content}
          {...getValuesProps("content")}
        />
      </div>
      <CustomButton
        type="button"
        isError={!!errors.title || !!errors.content}
        onClick={handleEditTodo}
      >
        수정하기
      </CustomButton>
    </div>
  );
}

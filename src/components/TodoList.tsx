import { useContext, useState } from "react";
import { isAxiosError } from "axios";

import { TodoListContext } from "../context/TodoListContext";
import { SelectedTodoContext } from "../context/SelectedTodoContext";

import { validateTodo } from "../libs/utils/validate";
import useForm from "../hooks/useForm";

import { createTodo } from "../api/todo";

import CustomButton from "./CustomButton";
import Modal from "./modal/Modal";
import Label from "./Label";
import TextInput from "./TextInput";

function CreateTodoForm() {
  const { addTodo } = useContext(TodoListContext);
  const { values, isBlur, errors, getValuesProps } = useForm({
    initialValue: { title: "", content: "" },
    validate: validateTodo,
  });

  const handleAddTodo = async () => {
    try {
      const result = await createTodo(values);
      addTodo(result.data);
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
          {...getValuesProps("content")}
        />
      </div>
      <CustomButton
        type="button"
        isError={!!errors.title || !!errors.content}
        onClick={handleAddTodo}
      >
        추가하기
      </CustomButton>
    </div>
  );
}

export default function TodoList() {
  const { todos } = useContext(TodoListContext);
  const { addItem } = useContext(SelectedTodoContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleMoveToTab = (todoId: string) => () => {
    addItem(todoId);
  };

  const handleAddTodo = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <article>
        <h1>할 일 목록</h1>
        <CustomButton onClick={handleAddTodo}>할 일 추가하기</CustomButton>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id} onClick={handleMoveToTab(todo.id)}>
              {todo.title}
            </li>
          ))}
        </ul>
      </article>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateTodoForm />
        </Modal>
      )}
    </>
  );
}

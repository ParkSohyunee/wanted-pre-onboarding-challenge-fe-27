import { useCallback, useContext, useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { SelectedTodoContext } from "../context/SelectedTodoContext";
import { getTodoById } from "../api/todo";
import { Todo } from "../types/todo";

import CustomButton from "./CustomButton";
import Label from "./Label";
import TextInput from "./TextInput";
import Modal from "./modal/Modal";
import EditTodoForm from "./EditTodoForm";

type ContentsViewProps = {
  todoData: Todo;
};

function ContentsView({ todoData }: ContentsViewProps) {
  return (
    <div>
      <div>
        <Label htmlFor="title">제목</Label>
        <TextInput readOnly value={todoData.title} />
      </div>
      <div>
        <Label htmlFor="content">내용</Label>
        <TextInput readOnly value={todoData.content} />
      </div>
    </div>
  );
}

export default function TodoContents() {
  const { selectedItems } = useContext(SelectedTodoContext);
  const [todoDetail, setTodoDetail] = useState<Todo>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAddTodo = () => {
    setIsOpenModal(true);
  };

  const fetchTodoDetail = useCallback(async () => {
    if (selectedItems.length > 0) {
      const id = selectedItems[selectedItems.length - 1];
      try {
        const result = await getTodoById({ id });
        setTodoDetail(result.data);
      } catch (error) {
        if (isAxiosError(error)) {
          alert(error.response?.data.details);
        }
      }
    }
  }, [selectedItems]);

  useEffect(() => {
    fetchTodoDetail();
  }, [fetchTodoDetail]);

  if (!todoDetail) {
    return;
  }

  return (
    <>
      <div>
        <ContentsView todoData={todoDetail} />
        <CustomButton isError={false} onClick={handleAddTodo}>
          수정하기
        </CustomButton>
      </div>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <EditTodoForm
            todoData={todoDetail}
            onClose={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

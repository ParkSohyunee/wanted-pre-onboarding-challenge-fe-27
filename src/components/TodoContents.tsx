import { useCallback, useContext, useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { SelectedTodoContext } from "../context/SelectedTodoContext";
import { getTodoById } from "../api/todo";
import { Todo } from "../types/todo";

export default function TodoContents() {
  const { selectedItems } = useContext(SelectedTodoContext);
  const [todoDetail, setTodoDetail] = useState<Todo>();

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

  return (
    <div>
      <h2>{todoDetail?.title}</h2>
      <p>{todoDetail?.content}</p>
      <p>{todoDetail?.createdAt}</p>
    </div>
  );
}

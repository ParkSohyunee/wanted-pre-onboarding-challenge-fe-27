import { createContext, ReactNode, useState } from "react";

type Context = {
  selectedItems: string[];
  addItem: (todoId: string) => void;
};

const SelectedTodoContext = createContext<Context>({
  selectedItems: [],
  addItem: () => {},
});

type ContextProvider = {
  children: ReactNode;
};

// 현재 선택한 TODO만 저장해야 할 지, 배열로 관리해야 할 지 고민
// 추후 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회하는 기능 구현해야 하므로 현재 배열로 구현
const SelectedTodoContextProvider = ({ children }: ContextProvider) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addItem = (todoId: string) => {
    setSelectedItems((prev) => [...prev, todoId]);
  };

  return (
    <SelectedTodoContext.Provider value={{ selectedItems, addItem }}>
      {children}
    </SelectedTodoContext.Provider>
  );
};

export { SelectedTodoContext, SelectedTodoContextProvider };

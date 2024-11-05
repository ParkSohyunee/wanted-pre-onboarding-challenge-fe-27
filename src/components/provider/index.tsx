import { ReactNode } from "react";

import { TodoListContextProvider } from "../../context/TodoListContext";
import { SelectedTodoContextProvider } from "../../context/SelectedTodoContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <TodoListContextProvider>
      <SelectedTodoContextProvider>{children}</SelectedTodoContextProvider>
    </TodoListContextProvider>
  );
}

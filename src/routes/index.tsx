import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DefaultLayout from "./layout/DefaultLayout";
import { TodoListContextProvider } from "../context/TodoListContext";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: (
          <TodoListContextProvider>
            <Home />
          </TodoListContextProvider>
        ),
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

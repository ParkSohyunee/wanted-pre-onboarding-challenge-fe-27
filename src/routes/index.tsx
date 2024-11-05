import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DefaultLayout from "./layout/DefaultLayout";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

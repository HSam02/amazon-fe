import { createBrowserRouter } from "react-router-dom";
import { IUser } from "../utils/types/interfaces";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

const createRouter = (user: IUser | null) =>
  createBrowserRouter([
    {
      path: "/",
      element: <>home</>,
    },
    {
      path: "/auth",
      element: <ProtectedRoute isAllowed={user === null} redirectPath="/" />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

export default createRouter;

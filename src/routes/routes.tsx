import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/features/AppLayout";
import { Login, Register, Admin } from "../pages/";
import { ProtectedRoute } from "./ProtectedRoute";
import { IUserState } from "../redux/reducers/user.reducer";
import { requestStatus, roles } from "../utils/types/enums";

const createRouter = ({ user, status }: IUserState) => {
  const isUserLoading =
    status === requestStatus.IDLE || status === requestStatus.PENDING;
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <>home</>,
        },
        {
          path: "/auth",
          element: (
            <ProtectedRoute
              isAllowed={user === null}
              isLoading={isUserLoading}
              redirectPath="/"
            />
          ),
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
        {
          path: "/admin",
          element: (
            <ProtectedRoute
              isAllowed={user?.role === roles.ADMIN}
              isLoading={isUserLoading}
              redirectPath="/"
            >
              <Admin />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
};

export default createRouter;

import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/features/AppLayout";
import { Login, Register, Admin, Settings, Home, Cart } from "../pages/";
import { ProtectedRoute } from "./ProtectedRoute";
import { IUserState } from "../redux/reducers/user.reducer";
import { requestStatus, roles } from "../utils/types/enums";
import { MyStore } from "../pages/MyStore";

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
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
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
        {
          path: "/user",
          element: (
            <ProtectedRoute
              isAllowed={user !== null}
              isLoading={isUserLoading}
              redirectPath="/"
            />
          ),
          children: [
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "store",
              element: <MyStore />,
            },
          ],
        },
      ],
    },
  ]);
};

export default createRouter;

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { getUser } from "./services/auth.service";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>home</>,
    loader: () => {
      // return redirect('/auth/login')
      console.log(store.getState().user);
      return null;
    },
  },
  {
    path: "/auth",
    loader: () => {
      // return redirect('/');
      return null;
    },
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

export const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

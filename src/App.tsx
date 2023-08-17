import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser } from "./redux/actionCreators/user.actionCreators";
import { selectUser } from "./redux/selectors";
import createRouter from "./routes/routes";

export const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const router = useMemo(() => createRouter(user), [user]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

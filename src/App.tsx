import { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser } from "./redux/actionCreators/user.actionCreators";
import { selectUser } from "./redux/selectors";
import createRouter from "./routes/routes";
import { getCategories } from "./redux/actionCreators/categories.actionCreators";

export const App = () => {
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);

  useLayoutEffect(() => {
    dispatch(getUser());
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useMemo(() => createRouter(userState), [userState]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

import { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser } from "./redux/actionCreators/user.actionCreators";
import { selectUser } from "./redux/selectors";
import createRouter from "./routes/routes";
import { getCategories } from "./redux/actionCreators/categories.actionCreators";
import { getSizes } from "./redux/actionCreators/sizes.actionCreators";
import { getColors } from "./redux/actionCreators/colors.actionCreators";

export const App = () => {
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);

  useLayoutEffect(() => {
    dispatch(getUser());
    dispatch(getCategories());
    dispatch(getSizes());
    dispatch(getColors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useMemo(() => createRouter(userState), [userState]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

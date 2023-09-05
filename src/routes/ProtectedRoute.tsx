import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loading } from "../components/shared/Loading";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath,
  isLoading,
  children,
}) => {
  const { pathname, state } = useLocation();
  console.log(state);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAllowed) {
    return (
      <Navigate
        to={redirectPath || state || "/"}
        state={pathname}
        replace
      />
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

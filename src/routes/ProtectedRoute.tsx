import { Navigate, Outlet } from "react-router-dom";
import { Loading } from "../components/shared/Loading";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/",
  isLoading,
  children,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

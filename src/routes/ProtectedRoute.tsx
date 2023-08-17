import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

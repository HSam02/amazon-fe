import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Navigate, Outlet } from "react-router-dom";
import scss from "./ProtectedRoute.module.scss";

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
    return (
      <div className={scss.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

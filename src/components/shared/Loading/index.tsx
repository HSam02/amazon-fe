import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import scss from "./Loading.module.scss";

type LoadingProps = {
  size?: number;
};

export const Loading: React.FC<LoadingProps> = ({ size = 80 }) => {
  return (
    <div className={scss.loading}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
    </div>
  );
};

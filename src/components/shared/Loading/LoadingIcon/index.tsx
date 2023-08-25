import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type LoadingIconProps = {
  size?: number;
};

export const LoadingIcon: React.FC<LoadingIconProps> = ({ size = 24 }) => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
  );
};

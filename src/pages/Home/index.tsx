import { Col, Layout, Row, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { Filters } from "../../components/features/Filters";
import { Products } from "../../components/features/MyStore/Products";
import scss from "./Home.module.scss";

export const Home = () => {
  return (
    <Space
      align="start"
      className={scss.space}
      classNames={{ item: scss.spaceItem }}
    >
      <Filters />
      <Products />
    </Space>
  );
};

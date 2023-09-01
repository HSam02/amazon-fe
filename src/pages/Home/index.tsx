import { useState } from "react";
import { Space } from "antd";
import { Filters } from "../../components/features/Filters";
import { Products } from "../../components/features/MyStore/Products";
import { ProductFilterType } from "../../utils/Products/interfaces";
import scss from "./Home.module.scss";

export const Home = () => {
  const [filters, setFilters] = useState<ProductFilterType>();

  return (
    <Space
      align="start"
      className={scss.space}
      classNames={{ item: scss.spaceItem }}
    >
      <Filters setFilters={setFilters}/>
      <Products filters={filters} />
    </Space>
  );
};

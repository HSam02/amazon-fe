import { useSelector } from "react-redux";
import { Product } from "../../../shared/Product";
import { selectProducts } from "../../../../redux/selectors";
import { Space, Typography } from "antd";
import scss from "./Products.module.scss";

export const Products = () => {
  const { products } = useSelector(selectProducts);

  if (products && products.length > 0) {
    return (
      <Space size={20} className={scss.products}>
        {products!.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Space>
    );
  }
  return <Typography.Text>No Products Yet</Typography.Text>;
};

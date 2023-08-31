import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScrollEnd from "../../../../utils/Products/useScrollEnd";
import { Space, Typography } from "antd";
import { Product } from "../../Product";
import { selectProducts } from "../../../../redux/selectors";
import scss from "./Products.module.scss";
import { requestStatus } from "../../../../utils/types/enums";
import { getUserProducts } from "../../../../redux/actionCreators/products.actionCreators";

export const Products = () => {
  const dispatch = useDispatch();
  const { products, status, pagination } = useSelector(selectProducts);

  const handleScroll = useCallback(() => {
    if (!pagination || !products) {
      return;
    }
    const { count, limit, page } = pagination;
    if (status !== requestStatus.PENDING && count - page * limit > 0) {
      dispatch(
        getUserProducts({
          ...pagination,
          page: page + 1,
        })
      );
    }
  }, [pagination, products]);

  useScrollEnd(handleScroll);

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

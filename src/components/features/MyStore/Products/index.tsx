import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScrollEnd from "../../../../utils/Products/useScrollEnd";
import { Space, Typography } from "antd";
import { Product } from "../../Product";
import { selectProducts } from "../../../../redux/selectors";
import {
  getAllProducts,
  getUserProducts,
} from "../../../../redux/actionCreators/products.actionCreators";
import { requestStatus } from "../../../../utils/types/enums";
import { ProductFilterType } from "../../../../utils/Products/interfaces";
import scss from "./Products.module.scss";
import { Loading } from "../../../shared/Loading";

type ProductsProps = {
  filters?: ProductFilterType;
};

export const Products: React.FC<ProductsProps> = ({ filters }) => {
  const dispatch = useDispatch();
  const { products, status, pagination } = useSelector(selectProducts);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!pagination || !products) {
      return;
    }
    const { count, limit, page } = pagination;
    if (status !== requestStatus.PENDING && count - page * limit > 0) {
      const newPagination = {
        ...pagination,
        page: page + 1,
      };

      dispatch(
        filters
          ? getAllProducts(newPagination, filters)
          : getUserProducts(newPagination)
      );
    }
  }, [pagination, products]);

  useEffect(() => {
    if (!filters) {
      dispatch(getUserProducts());
    }
  }, [filters]);

  useScrollEnd(handleScroll, boxRef);

  if (
    (status === requestStatus.PENDING || status === requestStatus.IDLE) &&
    !products
  ) {
    return <Loading />;
  }

  if (products && products.length > 0) {
    return (
      <Space size={20} className={scss.products} ref={boxRef}>
        {products!.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Space>
    );
  }
  return <Typography.Text>No Products Yet</Typography.Text>;
};

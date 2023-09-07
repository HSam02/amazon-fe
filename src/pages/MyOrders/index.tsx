import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Typography } from "antd";
import useScrollEnd from "../../utils/Products/useScrollEnd";
import { Loading } from "../../components/shared/Loading";
import { columns, getFooter } from "../../utils/Orders/orderTableData";
import { selectOrders } from "../../redux/selectors";
import {
  clearOrdersSlice,
  getOrders,
} from "../../redux/actionCreators/orders.actionCreators";
import { requestStatus } from "../../utils/types/enums";

export const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, status, pagination } = useSelector(selectOrders);

  const handleScroll = useCallback(() => {
    if (!pagination || !orders) {
      return;
    }
    const { count, limit, page } = pagination;
    if (status !== requestStatus.PENDING && count - page * limit > 0) {
      const newPagination = {
        ...pagination,
        page: page + 1,
      };

      dispatch(getOrders(newPagination));
    }
  }, [pagination, orders]);

  useScrollEnd(handleScroll);

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      dispatch(clearOrdersSlice());
    };
  }, []);

  if (status === requestStatus.PENDING && !orders) {
    return <Loading />;
  }

  if (!orders || !orders.length) {
    return <>Not orders yet</>;
  }

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      {orders.map((order) => (
        <>
          <Typography>Address: {order.address}</Typography>
          <Table
            key={order.id}
            columns={columns}
            dataSource={order.products.map(({ id, ...otherData }) => ({
              key: id,
              ...otherData,
            }))}
            pagination={false}
            footer={(data) => getFooter(data)}
          />
        </>
      ))}
    </Space>
  );
};

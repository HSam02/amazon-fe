import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { CartTable } from "../../components/features/Cart/CartTable";
import { BuyLater } from "../../components/features/Cart/BuyLater";
import { getCart } from "../../redux/actionCreators/cart.actionCreators";
import { getBuyLater } from "../../redux/actionCreators/buyLater.actionCreators";
import { selectUser } from "../../redux/selectors";

export const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getBuyLater());
  }, [user]);
  return (
    <Space direction="vertical" size={40} style={{ width: "100%" }}>
      <CartTable />
      <BuyLater />
    </Space>
  );
};

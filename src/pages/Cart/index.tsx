import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartTable } from "../../components/features/Cart/CartTable";
import { selectUser } from "../../redux/selectors";
import { getCart } from "../../redux/actionCreators/cart.actionCreators";

export const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getCart());
  }, [user]);
  return (
    <>
      <CartTable />
    </>
  );
};

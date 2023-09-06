import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/selectors";
import { Navigate } from "react-router-dom";

export const MakeOrder = () => {
  const { cartItems } = useSelector(selectCart);
  console.log(cartItems);

  const totalPrice = useMemo(
    () =>
      cartItems?.reduce(
        (acc, item) => acc + item.quantity + +item.product.price,
        0
      ),
    [cartItems]
  );

  if (!cartItems || cartItems.length === 0) {
    return <Navigate to="/" />;
  }

  return <>Make Order</>;
};

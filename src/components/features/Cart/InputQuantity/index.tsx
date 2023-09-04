import { InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../../../redux/actionCreators/cart.actionCreators";
import { ICartItem } from "../../../../utils/types/interfaces";
import { useRef } from "react";

type InputQuantityProps = {
  id: number;
  quantity: number;
};

export const InputQuantity: React.FC<InputQuantityProps> = ({
  id,
  quantity,
}) => {
  const dispatch = useDispatch();
  const timer = useRef<NodeJS.Timeout>();

  const handleChange = (value: number | null) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      console.log(value);
      
      value && dispatch(updateCartItem({ id, quantity: value } as ICartItem));
    }, 1500);
  };

  return (
    <InputNumber
      placeholder="Quantiy"
      defaultValue={quantity}
      onChange={handleChange}
      min={1}
      max={10}
    />
  );
};

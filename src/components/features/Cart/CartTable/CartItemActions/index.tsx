import { useDispatch } from "react-redux";
import { Button, Popconfirm, Space } from "antd";
import { deleteCartItem } from "../../../../../redux/actionCreators/cart.actionCreators";

type CartItemActionsProps = {
  id: number;
};

export const CartItemActions: React.FC<CartItemActionsProps> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <Space>
      <Popconfirm
        title={`Delete Cart Item`}
        description={`Are you sure to delete this item?`}
        onConfirm={() => dispatch(deleteCartItem(id))}
      >
        <Button type="text">Delete</Button>
      </Popconfirm>

      <Button type="text">Save for later</Button>
    </Space>
  );
};

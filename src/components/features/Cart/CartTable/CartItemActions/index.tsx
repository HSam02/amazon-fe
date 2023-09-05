import { useDispatch } from "react-redux";
import { Button, Popconfirm, Space } from "antd";
import { deleteCartItem } from "../../../../../redux/actionCreators/cart.actionCreators";
import { ICartItem } from "../../../../../utils/types/interfaces";
import { createBuyLaterItem } from "../../../../../redux/actionCreators/buyLater.actionCreators";

type CartItemActionsProps = {
  item: Omit<ICartItem, "status">;
};

export const CartItemActions: React.FC<CartItemActionsProps> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <Space>
      <Popconfirm
        title={`Delete Cart Item`}
        description={`Are you sure to delete this item?`}
        onConfirm={() => dispatch(deleteCartItem(item.id))}
      >
        <Button type="text">Delete</Button>
      </Popconfirm>
      <Button
        onClick={() => {
          dispatch(
            createBuyLaterItem({
              color: item.color,
              product: item.product,
              size: item.size,
            })
          );
          dispatch(deleteCartItem(item.id));
        }}
        type="text"
      >
        Save for later
      </Button>
    </Space>
  );
};

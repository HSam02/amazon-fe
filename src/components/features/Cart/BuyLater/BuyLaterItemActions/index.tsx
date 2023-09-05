import { useDispatch } from "react-redux";
import { Button, Popconfirm, Space } from "antd";
import { createCartItem } from "../../../../../redux/actionCreators/cart.actionCreators";
import { deleteBuyLaterItem } from "../../../../../redux/actionCreators/buyLater.actionCreators";
import { IBuyLaterItem } from "../../../../../utils/types/interfaces";

type BuyLaterItemActionsProps = {
  item: Omit<IBuyLaterItem, "status">;
};

export const BuyLaterItemActions: React.FC<BuyLaterItemActionsProps> = ({
  item,
}) => {
  const dispatch = useDispatch();
  return (
    <Space>
      <Popconfirm
        title={`Delete Item`}
        description={`Are you sure to delete this item?`}
        onConfirm={() => dispatch(deleteBuyLaterItem(item.id))}
      >
        <Button type="text">Delete</Button>
      </Popconfirm>
      <Button
        type="text"
        onClick={() => {
          dispatch(createCartItem({ ...item, quantity: 1 }));
          dispatch(deleteBuyLaterItem(item.id));
        }}
      >
        Add to Cart
      </Button>
    </Space>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../redux/selectors";
import {
  ICartItem,
  IColor,
  IProduct,
  ISize,
} from "../../utils/types/interfaces";
import Table, { ColumnsType } from "antd/es/table";
import { AppImage } from "../../components/shared/AppImage";
import { Space, Typography } from "antd";
import { useEffect } from "react";
import { getCart } from "../../redux/actionCreators/cart.actionCreators";

type DataType = Omit<ICartItem, "id" | "status"> & { key: number };

const columns: ColumnsType<DataType> = [
  {
    title: "Product",
    dataIndex: "product",
    render: (product: IProduct) => (
      <Space>
        <AppImage width={100} height={100} url={product.defaultImg?.url} />
        <Typography>{product.name}</Typography>
      </Space>
    ),
  },
  {
    title: "Color",
    dataIndex: "color",
    render: ({ value }: IColor) => <Typography>{value}</Typography>,
  },
  {
    title: "Size",
    dataIndex: "size",
    render: ({ value }: ISize) => <Typography>{value}</Typography>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
];

export const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, status } = useSelector(selectCart);

  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={cartItems?.map(({ status, id, ...otherData }) => ({
        key: id,
        ...otherData,
      }))}
      pagination={false}
    />
  );
};

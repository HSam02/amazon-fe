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
import { Button, InputNumber, Space, Typography } from "antd";
import { useEffect } from "react";
import {
  getCart,
  updateCartItem,
} from "../../redux/actionCreators/cart.actionCreators";
import { InputQuantity } from "../../components/features/Cart/InputQuantity";
import { LoadingIcon } from "../../components/shared/Loading/LoadingIcon";
import { requestStatus } from "../../utils/types/enums";

type DataType = Omit<ICartItem, "id" | "status"> & { key: number };

export const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, status } = useSelector(selectCart);

  const columns: ColumnsType<DataType> = [
    {
      title: "Product",
      dataIndex: "product",
      render: (product: IProduct) => (
        <Space>
          <AppImage width={100} height={100} url={product.defaultImg?.url} />
          <Typography>
            {product.name} ${product.price}
          </Typography>
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
      render: (value, { key }) => <InputQuantity id={key} quantity={value} />,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="text">Delete</Button>
          <Button type="text">Save for later</Button>
        </Space>
      ),
    },
  ];

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
      footer={(data) => {
        const total = data.reduce(
          (acc, { quantity, product }) => ({
            price: acc.price + quantity * +product.price,
            count: acc.count + quantity,
          }),
          { price: 0, count: 0 }
        );

        return (
          <Space style={{ width: "100%", justifyContent: "end" }}>
            <Typography>{`Subtotal: (${total.count} item${
              data.length > 1 ? "s" : ""
            }): $${total.price}`}</Typography>
            <Button type="primary" loading={status === requestStatus.PENDING}>
              Proceed to checkout
            </Button>
          </Space>
        );
      }}
    />
  );
};

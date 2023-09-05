import { Button, Space, Typography } from "antd";
import { CartItemActions } from "../../components/features/Cart/CartTable/CartItemActions";
import { AppImage } from "../../components/shared/AppImage";
import { InputQuantity } from "../../components/features/Cart/InputQuantity";
import { IProduct, IColor, ISize, ICartItem } from "../types/interfaces";
import { ColumnsType } from "antd/es/table";

type DataType = Omit<ICartItem, "id" | "status"> & { key: number };

export const columns: ColumnsType<DataType> = [
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
    render: (_, { key, ...otherData }) => (
      <CartItemActions item={{ id: key, ...otherData }} />
    ),
  },
];

export const getFooter = (data: readonly DataType[]) => {
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
        total.count > 1 ? "s" : ""
      }) $${total.price}`}</Typography>
      <Button type="primary" disabled={data.length === 0}>
        Proceed to checkout
      </Button>
    </Space>
  );
};

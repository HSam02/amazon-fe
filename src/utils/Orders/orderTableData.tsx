import { Space, Typography } from "antd";
import { AppImage } from "../../components/shared/AppImage";
import { IProduct } from "../types/interfaces";
import { ColumnsType } from "antd/es/table";

type DataType = Pick<IProduct, "name" | "price" | "defaultImg"> & {
  quantity: number;
  size: string;
  color: string;
} & { key: number };

export const columns: ColumnsType<DataType> = [
  {
    title: "Product",
    dataIndex: "product",
    render: (_, { defaultImg, name, price }) => (
      <Space>
        <AppImage width={100} height={100} url={defaultImg?.url} />
        <Typography>
          {name} ${price}
        </Typography>
      </Space>
    ),
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (_, { color }) => <Typography>{color}</Typography>,
  },
  {
    title: "Size",
    dataIndex: "size",
    render: (_, { size }) => <Typography>{size}</Typography>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    render: (_, { quantity }) => <Typography>{quantity}</Typography>,
  },
];

export const getFooter = (data: readonly DataType[]) => {
  const total = data.reduce(
    (acc, { quantity, price }) => ({
      price: acc.price + quantity * +price,
      count: acc.count + quantity,
    }),
    { price: 0, count: 0 }
  );

  return (
    <Space style={{ width: "100%", justifyContent: "end" }}>
      <Typography>{`Subtotal: (${total.count} item${
        total.count > 1 ? "s" : ""
      }) $${total.price}`}</Typography>
    </Space>
  );
};

import { Space, Typography } from "antd";
import { BuyLaterItemActions } from "../../components/features/Cart/BuyLater/BuyLaterItemActions";
import { AppImage } from "../../components/shared/AppImage";
import { IProduct, IColor, ISize, IBuyLaterItem } from "../types/interfaces";
import { ColumnsType } from "antd/es/table";

type DataType = Omit<IBuyLaterItem, "id" | "status"> & { key: number };

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
    title: "Actions",
    render: (_, { key, ...otherData }) => (
      <BuyLaterItemActions item={{ id: key, ...otherData }} />
    ),
  },
];

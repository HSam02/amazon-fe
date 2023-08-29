import { Button, Card, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { AppImage } from "../../shared/AppImage";
import { IProduct } from "../../../utils/types/interfaces";

type ProductProps = {
  product: IProduct;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card
      cover={<AppImage url={product.defaultImg?.url} preview={false} />}
      actions={[<Button>Edit</Button>, <Button>Delete</Button>]}
    >
      <Typography.Text>{product.category?.title}</Typography.Text>
      <Meta
        title={product.name}
        description={
          <Typography.Text ellipsis type="secondary">
            {product.description || "No description"}
          </Typography.Text>
        }
      />
    </Card>
  );
};

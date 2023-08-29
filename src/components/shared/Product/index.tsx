import { Button, Card, Carousel, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { Images } from "./Images";
import { IProduct } from "../../../utils/types/interfaces";
import Typography from "antd/es/typography/Typography";
import { AppImage } from "../AppImage";

type ProductProps = {
  product: IProduct;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card
      cover={<AppImage url={product.defaultImg?.url} preview={false} />}
      actions={[<Button>Edit</Button>, <Button>Delete</Button>]}
    >
      <Typography>{product.category?.title}</Typography>
      <Meta
        title={product.name}
        description={product.description || "No description"}
      />
    </Card>
  );
};

import { useState } from "react";
import { Button, Card, Popconfirm, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { AppImage } from "../../shared/AppImage";
import { IProduct } from "../../../utils/types/interfaces";
import { requestStatus } from "../../../utils/types/enums";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actionCreators/products.actionCreators";
import { ProductForm } from "../MyStore/ProductForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/selectors";

type ProductProps = {
  product: IProduct;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector(selectUser);
  return (
    <>
      <Card
        cover={<AppImage url={product.defaultImg?.url} preview={false} />}
        actions={
          product.user.id === user?.id
            ? [
                <Button onClick={() => setIsModalOpen(true)}>Edit</Button>,
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure to delete this Product?"
                  onConfirm={() => dispatch(deleteProduct(product.id))}
                >
                  <Button>Delete</Button>
                </Popconfirm>,
              ]
            : [<Button>Add to Cart</Button>, <Button>Buy Later</Button>]
        }
        loading={product.status === requestStatus.PENDING}
        style={
          product.status === requestStatus.ERROR
            ? { borderColor: "red" }
            : undefined
        }
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
        <Typography.Text>{product.price}</Typography.Text>
      </Card>
      {isModalOpen && (
        <ProductForm onClose={() => setIsModalOpen(false)} product={product} />
      )}
    </>
  );
};

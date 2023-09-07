import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Popconfirm, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { AppImage } from "../../../shared/AppImage";
import { ProductForm } from "../../ProductForm";
import { AddToCartForm } from "../../AddToCartForm";
import { IProduct } from "../../../../utils/types/interfaces";
import { requestStatus } from "../../../../utils/types/enums";
import { deleteProduct } from "../../../../redux/actionCreators/products.actionCreators";
import { selectUser } from "../../../../redux/selectors";
import { AddToBuyLaterForm } from "../../AddToBuyLaterForm";

type ProductProps = {
  product: IProduct;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [isAddToBuyLaterOpen, setIsAddToBuyLaterOpen] = useState(false);
  const { user } = useSelector(selectUser);
  return (
    <>
      <Card
        cover={<AppImage url={product.defaultImg?.url} preview={false} />}
        actions={
          product.user.id === user?.id
            ? [
                <Button onClick={() => setIsEditing(true)}>Edit</Button>,
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure to delete this Product?"
                  onConfirm={() => dispatch(deleteProduct(product.id))}
                >
                  <Button>Delete</Button>
                </Popconfirm>,
              ]
            : [
                <Button onClick={() => setIsAddToCartOpen(true)}>
                  Add to Cart
                </Button>,
                <Button onClick={() => setIsAddToBuyLaterOpen(true)}>
                  Buy Later
                </Button>,
              ]
        }
        loading={product.status === requestStatus.PENDING}
        style={
          product.status === requestStatus.ERROR
            ? { borderColor: "red" }
            : undefined
        }
      >
        <Typography.Text>
          {product.category?.title} /{" "}
          <span style={{ color: "#00000073" }}>{product.brand}</span>
        </Typography.Text>
        <Meta
          title={product.name}
          description={
            <Typography.Text ellipsis type="secondary">
              {product.description || "No description"}
            </Typography.Text>
          }
        />
        <Typography>${product.price}</Typography>
        {product.statistic && (
          <Typography.Text>
            Total count: {product.statistic.totalCount}, Total earning: $
            {product.statistic.totalPrice}
          </Typography.Text>
        )}
      </Card>
      {isEditing && (
        <ProductForm onClose={() => setIsEditing(false)} product={product} />
      )}
      {isAddToCartOpen && (
        <AddToCartForm
          product={product}
          onClose={() => setIsAddToCartOpen(false)}
        />
      )}
      {isAddToBuyLaterOpen && (
        <AddToBuyLaterForm
          product={product}
          onClose={() => setIsAddToBuyLaterOpen(false)}
        />
      )}
    </>
  );
};

import { Form, Input, InputNumber, Modal, Select } from "antd";
import { ICartItem, IProduct } from "../../../utils/types/interfaces";
import { requiredRule } from "../../../utils/Products/form.rules";
import { useDispatch } from "react-redux";
import { ICreateCartSchema } from "../../../utils/Cart/interfaces";
import { createCartItem } from "../../../redux/actionCreators/cart.actionCreators";

type AddToCartFormProps = {
  product: IProduct;
  onClose: () => void;
};

export const AddToCartForm: React.FC<AddToCartFormProps> = ({
  product,
  onClose,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = (values: ICreateCartSchema) => {
    const { colorId, quantity, sizeId } = values;
    const color = product.colors.find(({ id }) => id === colorId);
    const size = product.sizes.find(({ id }) => id === colorId);
    if (!color || !size) {
      return;
    }
    dispatch(createCartItem({ quantity, color, size, product }));
    onClose();
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal open closeIcon={false} onOk={onOk} onCancel={onClose}>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          name="colorId"
          rules={[requiredRule]}
          initialValue={product.colors[0].id}
        >
          <Select
            placeholder="Colors"
            options={product.colors.map((color) => ({
              label: color.value,
              value: color.id,
            }))}
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="sizeId"
          rules={[requiredRule]}
          initialValue={product.sizes[0].id}
        >
          <Select
            placeholder="Sizes"
            options={product.sizes.map((size) => ({
              label: size.value,
              value: size.id,
            }))}
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item name="quantity" rules={[requiredRule]} initialValue={1}>
          <InputNumber placeholder="Quantiy" min={1} max={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

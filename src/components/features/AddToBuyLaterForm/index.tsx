import { useDispatch } from "react-redux";
import { Form, Modal, Select } from "antd";
import { IProduct } from "../../../utils/types/interfaces";
import { ICreateBuyLaterSchema } from "../../../utils/Cart/interfaces";
import { requiredRule } from "../../../utils/Products/form.rules";
import { createBuyLaterItem } from "../../../redux/actionCreators/buyLater.actionCreators";

type AddToBuyLaterFormProps = {
  product: IProduct;
  onClose: () => void;
};

export const AddToBuyLaterForm: React.FC<AddToBuyLaterFormProps> = ({
  product,
  onClose,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = (values: ICreateBuyLaterSchema) => {
    const { colorId, sizeId } = values;
    const color = product.colors.find(({ id }) => id === colorId);
    const size = product.sizes.find(({ id }) => id === sizeId);
    if (!color || !size) {
      return;
    }
    dispatch(createBuyLaterItem({ color, size, product }));
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
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

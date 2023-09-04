import { Form, Input, InputNumber, Modal, Select } from "antd";
import { IProduct } from "../../../utils/types/interfaces";
import { requiredRule } from "../../../utils/Products/form.rules";

type AddToCartFormProps = {
  product: IProduct;
  onClose: () => void;
};

export const AddToCartForm: React.FC<AddToCartFormProps> = ({
  product,
  onClose,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal open closeIcon={false} onOk={onOk} onCancel={onClose}>
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          name="colorIds"
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
          name="sizeIds"
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
          <InputNumber
            placeholder="Quantiy"
            min={1}
            max={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

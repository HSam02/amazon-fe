import { Form, Input, Modal } from "antd";
import { AddressDataType } from "../../../../../utils/Addresses/interfaces";
import { useDispatch } from "react-redux";
import { addressRules } from "../../../../../utils/Addresses/form.rules";
import { IAddress } from "../../../../../utils/types/interfaces";
import {
  createAddress,
  updateAddress,
} from "../../../../../redux/actionCreators/addresses.actionCreators";

type AddressFormProps = {
  address?: AddressDataType;
  onClose: () => void;
};

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onClose,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ value }: { value: string }) => {
    if (address) {
      dispatch(updateAddress({ id: address.key, value } as IAddress));
    } else {
      dispatch(createAddress(value));
    }
    onClose();
  };

  const onOk = () => {
    if (address?.address === form.getFieldValue("value")) {
      return onClose();
    }
    form.submit();
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onOk();
    }
  };

  return (
    <Modal open centered closeIcon={false} onOk={onOk} onCancel={onClose}>
      <Form
        form={form}
        initialValues={address ? { value: address.address } : undefined}
        onFinish={onSubmit}
        onKeyDown={handlePressEnter}
      >
        <Form.Item name="value" rules={addressRules}>
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

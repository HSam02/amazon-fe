import { Form, Input, Modal } from "antd";
import { ISize } from "../../../../../utils/types/interfaces";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../../../../redux/actionCreators/categories.actionCreators";
import { CategoryRules } from "../../../../../utils/Admin/form.rules";
import { adminTools } from "../../../../../utils/types/enums";
import {
  createSize,
  updateSize,
} from "../../../../../redux/actionCreators/sizes.actionCreators";
import { IItem } from "..";

type FormModalProps = {
  onClose: () => void;
  item: IItem;
  edit?: boolean;
};

export const FormModal: React.FC<FormModalProps> = ({
  onClose,
  item,
  edit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ title }: { title: string }) => {
    switch (item.type) {
      case adminTools.CATEGORY: {
        edit
          ? dispatch(updateCategory({ title, id: item.id }))
          : dispatch(
              createCategory({
                title,
                parentId: item.id !== 0 ? item.id : undefined,
              })
            );
        break;
      }
      case adminTools.SIZE: {
        edit
          ? dispatch(updateSize({ id: item.id, value: title } as ISize))
          : dispatch(createSize(title));
        break;
      }
    }

    onClose();
  };

  const onOk = () => {
    if (item.title === form.getFieldValue("title")) {
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
        initialValues={edit ? { title: item.title } : undefined}
        onFinish={onSubmit}
        onKeyDown={handlePressEnter}
      >
        <Form.Item name="title" rules={CategoryRules}>
          <Input placeholder="Title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

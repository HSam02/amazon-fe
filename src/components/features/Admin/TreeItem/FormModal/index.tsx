import { Form, Input, Modal } from "antd";
import { IColor, ISize } from "../../../../../utils/types/interfaces";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../../../../redux/actionCreators/categories.actionCreators";
import {
  CategoryRules,
  ColorRules,
  SizeRules,
} from "../../../../../utils/Admin/form.rules";
import { adminTools } from "../../../../../utils/types/enums";
import {
  createSize,
  updateSize,
} from "../../../../../redux/actionCreators/sizes.actionCreators";
import { IItem } from "../../../../../utils/Admin/interfaces";
import {
  createColor,
  updateColor,
} from "../../../../../redux/actionCreators/colors.actionCreators";

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
      case adminTools.COLOR: {
        edit
          ? dispatch(updateColor({ id: item.id, value: title } as IColor))
          : dispatch(createColor(title));
        break;
      }
    }

    onClose();
  };

  const onOk = () => {
    if (item.title === form.getFieldValue("title") && edit) {
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
        <Form.Item
          name="title"
          rules={
            item.type === adminTools.CATEGORY
              ? CategoryRules
              : item.type === adminTools.COLOR
              ? ColorRules
              : SizeRules
          }
        >
          <Input placeholder="Title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

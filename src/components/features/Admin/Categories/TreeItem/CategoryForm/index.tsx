import { Form, Input, Modal } from "antd";
import { ICategory } from "../../../../../../utils/types/interfaces";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../../../../../redux/actionCreators/categories.actionCreators";
import { CategoryRules } from "../../../../../../utils/Categories/form.rules";

type CategoryFormProps = {
  onClose: () => void;
  category: ICategory;
  edit?: boolean;
};

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onClose,
  category,
  edit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ title }: { title: string }) => {
    if (edit) {
      dispatch(updateCategory({ title, id: category.id }));
    } else {
      dispatch(
        createCategory({
          title,
          parentId: category.id !== 0 ? category.id : undefined,
        })
      );
    }
    onClose();
  };

  return (
    <Modal
      open
      centered
      closeIcon={false}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      <Form
        form={form}
        initialValues={edit ? { title: category.title } : undefined}
        onFinish={onSubmit}
      >
        <Form.Item name="title" rules={CategoryRules}>
          <Input placeholder="Title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

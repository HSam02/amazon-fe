import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm, Space, Typography } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { LoadingIcon } from "../../../../shared/LoadingIcon";
import { CategoryForm } from "./CategoryForm";
import { deleteCategory } from "../../../../../redux/actionCreators/categories.actionCreators";
import { ICategory } from "../../../../../utils/types/interfaces";
import { requestStatus } from "../../../../../utils/types/enums";

type TreeItemProps = {
  category: ICategory;
};

enum modalStatuses {
  EDIT = "edit",
  ADD = "add",
  CLOSED = "closed",
}

export const TreeItem: React.FC<TreeItemProps> = ({ category }) => {
  const dispatch = useDispatch();
  const [modalStatus, setModalStatus] = useState<modalStatuses>(
    modalStatuses.CLOSED
  );

  return (
    <>
      <Space>
        {category.status === requestStatus.PENDING && <LoadingIcon size={12} />}
        <Typography.Text
          type={category.status === requestStatus.ERROR ? "danger" : undefined}
        >
          {category.title}
        </Typography.Text>
        {category.status !== requestStatus.PENDING && (
          <Button
            onClick={() => setModalStatus(modalStatuses.ADD)}
            type="primary"
            icon={<PlusOutlined />}
          />
        )}
        {category.id !== 0 && category.status !== requestStatus.PENDING && (
          <>
            <Button
              onClick={() => setModalStatus(modalStatuses.EDIT)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete Category"
              description="Are you sure to delete this category?"
              onConfirm={() => dispatch(deleteCategory(category.id))}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        )}
      </Space>
      {modalStatus !== modalStatuses.CLOSED && (
        <CategoryForm
          onClose={() => setModalStatus(modalStatuses.CLOSED)}
          category={category}
          edit={modalStatus === modalStatuses.EDIT}
        />
      )}
    </>
  );
};

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm, Space, Typography } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { LoadingIcon } from "../../../shared/Loading/LoadingIcon";
import { FormModal } from "./FormModal";
import { adminTools, modalStatuses, requestStatus } from "../../../../utils/types/enums";
import { IItem } from "../../../../utils/Admin/interfaces";
import { deleteCategory } from "../../../../redux/actionCreators/categories.actionCreators";
import { deleteSize } from "../../../../redux/actionCreators/sizes.actionCreators";
import { deleteColor } from "../../../../redux/actionCreators/colors.actionCreators";

type TreeItemProps = {
  item: IItem;
};

export const TreeItem: React.FC<TreeItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [modalStatus, setModalStatus] = useState<modalStatuses>(
    modalStatuses.CLOSED
  );

  const handleDelete = () => {
    switch (item.type) {
      case adminTools.CATEGORY: {
        dispatch(deleteCategory(item.id));
        break;
      }
      case adminTools.SIZE: {
        dispatch(deleteSize(item.id));
        break;
      }
      case adminTools.COLOR: {
        dispatch(deleteColor(item.id));
        break;
      }
    }
  };

  return (
    <>
      <Space>
        {item.status === requestStatus.PENDING && <LoadingIcon size={12} />}
        <Typography.Text
          type={item.status === requestStatus.ERROR ? "danger" : undefined}
        >
          {item.title}
        </Typography.Text>
        {item.status !== requestStatus.PENDING &&
          (item.type === adminTools.CATEGORY || item.id === 0) && (
            <Button
              onClick={() => setModalStatus(modalStatuses.ADD)}
              type="primary"
              icon={<PlusOutlined />}
            />
          )}
        {item.id !== 0 && item.status !== requestStatus.PENDING && (
          <>
            <Button
              onClick={() => setModalStatus(modalStatuses.EDIT)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title={`Delete ${item.type}`}
              description={`Are you sure to delete this ${item.type}?`}
              onConfirm={handleDelete}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        )}
      </Space>
      {modalStatus !== modalStatuses.CLOSED && (
        <FormModal
          onClose={() => setModalStatus(modalStatuses.CLOSED)}
          item={item}
          edit={modalStatus === modalStatuses.EDIT}
        />
      )}
    </>
  );
};

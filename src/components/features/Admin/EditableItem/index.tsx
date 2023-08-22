import { Button, Space, Typography } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

type EditableItemProps = {
  id: any;
  title: any;
};

export const EditableItem: React.FC<EditableItemProps> = ({ id, title }) => {
  console.log(id, title);

  return (
    <Space>
      <Typography>{title}</Typography>
      <Button type="primary" icon={<PlusOutlined />} />
      {id !== 0 && (
        <>
          <Button icon={<EditOutlined />} />
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </>
      )}
    </Space>
  );
};

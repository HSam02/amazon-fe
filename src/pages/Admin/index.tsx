import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/selectors";
import { ICategory } from "../../utils/types/interfaces";
import scss from "./Admin.module.scss";
import Tree, { DataNode } from "antd/es/tree";
import { EditableItem } from "../../components/features/Admin/EditableItem";
import { DownOutlined } from "@ant-design/icons";

const getTreeData = (categories: ICategory[]): DataNode[] =>
  categories.map((category) => ({
    title: <EditableItem id={category.id} title={category.title} />,
    key: category.title + "/" + category.id,
    children:
      category.subCategories.length > 0
        ? getTreeData(category.subCategories)
        : undefined,
  }));

export const Admin = () => {
  const { categories } = useSelector(selectCategories);
  const treeData = useMemo(
    () =>
      categories
        ? ([
            {
              title: <EditableItem id={0} title="Category" />,
              key: "parent/0",
              switcherIcon: undefined,
              children: getTreeData(categories),
            },
          ] as DataNode[])
        : undefined,
    [categories]
  );

  return (
    <>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        treeData={treeData}
        selectable={false}
      />
    </>
  );
};

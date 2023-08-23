import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/selectors";
import { getCategoryTreeData } from "../../../../utils/Admin/treeDataGenerators";

export const Categories = () => {
  const { categories, status } = useSelector(selectCategories);

  const treeData = useMemo(
    () => getCategoryTreeData(categories || [], status),
    [categories, status]
  );

  return (
    <Tree
      showLine={Boolean(categories && categories.length > 0)}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      selectable={false}
    />
  );
};

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/selectors";
import getTreeData from "../../../../utils/Categories/getTreeData";

export const Categories = () => {
  const { categories, status } = useSelector(selectCategories);

  const treeData = useMemo(() => getTreeData(categories || [], status), [categories, status]);

  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      selectable={false}
      
    />
  );
};

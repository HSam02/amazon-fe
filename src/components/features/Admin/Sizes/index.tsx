import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectSizes } from "../../../../redux/selectors";
import { useMemo } from "react";
import { getSizesTreeData } from "../../../../utils/Admin/treeDataGenerators";

export const Sizes = () => {
  const { sizes, status } = useSelector(selectSizes);
  const treeData = useMemo(
    () => getSizesTreeData(sizes || [], status),
    [sizes]
  );

  return (
    <Tree
      showLine={Boolean(sizes && sizes.length > 0)}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      selectable={false}
    />
  );
};

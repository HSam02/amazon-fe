import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { selectColors } from "../../../../redux/selectors";
import { getColorTreeData } from "../../../../utils/Admin/treeDataGenerators";

export const Colors = () => {
  const { colors, status } = useSelector(selectColors);
  const treeData = useMemo(
    () => getColorTreeData(colors || [], status),
    [colors]
  );

  return (
    <Tree
      showLine={Boolean(colors && colors.length > 0)}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      selectable={false}
    />
  );
};

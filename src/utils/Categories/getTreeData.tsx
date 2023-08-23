import { DataNode } from "antd/es/tree";
import { ICategory } from "../types/interfaces";
import { TreeItem } from "../../components/features/Admin/Categories/TreeItem";
import { requestStatus } from "../types/enums";

const getTreeNestedData = (categories: ICategory[]): DataNode[] =>
  categories.map((category) => ({
    title: <TreeItem category={category} />,
    key: category.title + "/" + category.id,
    children:
      category.subCategories.length > 0
        ? getTreeNestedData(category.subCategories)
        : undefined,
  }));

const getTreeData = (
  categories: ICategory[],
  status: requestStatus
): DataNode[] => [
  {
    title: (
      <TreeItem
        category={{ id: 0, title: "Categories", status } as ICategory}
      />
    ),
    key: "parent/0",
    switcherIcon: undefined,
    children: getTreeNestedData(categories),
  },
];

export default getTreeData;

import { DataNode } from "antd/es/tree";
import { ICategory, ISize } from "../types/interfaces";
import { TreeItem } from "../../components/features/Admin/TreeItem";
import { adminTools, requestStatus } from "../types/enums";

export const getCategoryTreeData = (
  categories: ICategory[],
  status: requestStatus
): DataNode[] => {
  const getTreeNestedData = (categories: ICategory[]): DataNode[] =>
    categories.map((category) => ({
      title: (
        <TreeItem
          item={{
            id: category.id,
            status: category.status,
            title: category.title,
            type: adminTools.CATEGORY,
          }}
        />
      ),
      key: `category/${category.title}/${category.id}`,
      children:
        category.subCategories.length > 0
          ? getTreeNestedData(category.subCategories)
          : undefined,
    }));

  return [
    {
      title: (
        <TreeItem
          item={{
            id: 0,
            title: "Categories",
            status,
            type: adminTools.CATEGORY,
          }}
        />
      ),
      key: "category/0",
      children: getTreeNestedData(categories),
    },
  ];
};

export const getSizesTreeData = (
  sizes: ISize[],
  status: requestStatus
): DataNode[] => [
  {
    title: (
      <TreeItem
        item={{
          id: 0,
          title: "Sizes",
          status,
          type: adminTools.SIZE,
        }}
      />
    ),
    key: "size/0",
    children: sizes.map((size) => ({
      title: (
        <TreeItem
          item={{
            id: size.id,
            status: size.status,
            title: size.value,
            type: adminTools.SIZE,
          }}
        />
      ),
      key: `size/${size.value}/${size.id}`,
    })),
  },
];

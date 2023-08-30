import { useSelector } from "react-redux";
import { ICategory } from "../types/interfaces";
import { selectCategories } from "../../redux/selectors";
import { useMemo } from "react";

interface IItem {
  title: string;
  value: number;
  children?: IItem[];
}

const getCategoryTreeData = (categories: ICategory[] | null) =>
  categories?.map((category) => {
    const item: IItem = {
      value: category.id,
      title: category.title,
    };
    if (category.subCategories.length > 0) {
      item.children = getCategoryTreeData(category.subCategories);
    }
    return item;
  });

const useCategoryTreeData = () => {
  const { categories } = useSelector(selectCategories);
  const treeData = useMemo(() => getCategoryTreeData(categories), [categories]);
  return treeData;
};

export default useCategoryTreeData;

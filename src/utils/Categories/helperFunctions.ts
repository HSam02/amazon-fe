import { ICategory } from "../types/interfaces";
import { IActionCategory } from "./interfaces";

export const editCategoryRecursively = (
  categories: ICategory[],
  newData: Partial<IActionCategory>
): ICategory[] => {
  return categories.map((category) => {
    if (
      category.title
        ? category.title === newData.title
        : category.id === newData.id
    ) {
      return {
        ...category,
        id: newData.id || category.id,
        title: newData.title || category.title,
        status: newData.status || category.status,
      };
    } else if (category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: editCategoryRecursively(category.subCategories, newData),
      };
    }
    return category;
  });
};

export const addCategoryRecursively = (
  categories: ICategory[],
  newCategory: IActionCategory
): ICategory[] => {
  return categories.map((category) => {
    if (category.id === newCategory.parentId) {
      return {
        ...category,
        subCategories: [
          ...category.subCategories,
          {
            id: newCategory.id,
            title: newCategory.title,
            status: newCategory.status,
            subCategories: [] as ICategory[],
          } as ICategory,
        ],
      };
    } else if (category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: addCategoryRecursively(
          category.subCategories,
          newCategory
        ),
      };
    }
    return category;
  });
};

export const deleteCategoryRecursively = (
  categories: ICategory[],
  id: number
) => {
  return categories.filter((category) => {
    if (category.id === id) {
      return false;
    } else if (category.subCategories.length > 0) {
      category.subCategories = deleteCategoryRecursively(
        category.subCategories,
        id
      );
    }
    return true;
  });
};

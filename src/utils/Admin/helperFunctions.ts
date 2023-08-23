import { ICategory } from "../types/interfaces";
import { IActionCategory } from "./interfaces";

export const addCategoryRecursively = (
  categories: ICategory[],
  newCategory: IActionCategory
): ICategory[] => {
  if (newCategory.parentId === undefined) {
    return [
      ...categories,
      {
        id: newCategory.id,
        title: newCategory.title,
        status: newCategory.status,
        subCategories: [] as ICategory[],
      },
    ];
  }

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
          },
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

export const editCategoryRecursively = (
  categories: ICategory[],
  newData: Partial<IActionCategory>,
  id?: number
): ICategory[] => {
  return categories.map((category) => {
    if (id ? category.id === id : category.id === newData.id) {
      return {
        ...category,
        id: newData.id || category.id,
        title: newData.title || category.title,
        status: newData.status || category.status,
      };
    } else if (category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: editCategoryRecursively(
          category.subCategories,
          newData,
          id
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

export const isCategoryExists = (
  categories: ICategory[],
  title: string
): boolean =>
  categories.some((category) => {
    if (category.title.toLowerCase() === title.toLowerCase()) {
      return true;
    } else if (category.subCategories.length > 0) {
      return isCategoryExists(category.subCategories, title);
    }
    return false;
  });

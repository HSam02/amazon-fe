import {
  IActionCategory,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "../../utils/Categories/interfaces";
import { ICategory } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/categories.actionTypes";

export const getCategories = (): actions.IGetCategoriesAction => ({
  type: actions.GET_CATEGORIES,
});

export const setCategories = (
  categories: ICategory[]
): actions.ISetCategoriesAction => ({
  type: actions.SET_CATEGORIES,
  payload: categories,
});

export const setCategoriesPending =
  (): actions.ISetCategoriesPendingAction => ({
    type: actions.SET_CATEGORIES_PENDING,
  });

export const setCategoriesError = (): actions.ISetCategoriesErrorAction => ({
  type: actions.SET_CATEGORIES_ERROR,
});

export const createCategory = (
  category: ICreateCategoryRequest
): actions.ICreateCategoryAction => ({
  type: actions.CREATE_CATEGORY,
  payload: category,
});

export const addCategory = (
  category: IActionCategory
): actions.IAddCategoryAction => ({
  type: actions.ADD_CATEGORY,
  payload: category,
});

export const editCategory = (
  category: Partial<IActionCategory>
): actions.IEditCategoriesAction => ({
  type: actions.EDIT_CATEGORIES,
  payload: category,
});

export const updateCategory = (
  category: IUpdateCategoryRequest
): actions.IUpdateCategoryAction => ({
  type: actions.UPDATE_CATEGORY,
  payload: category,
});

export const deleteCategory = (id: number): actions.IDeleteCategoryAction => ({
  type: actions.DELETE_CATEGORY,
  payload: id,
});

export const removeCategory = (id: number): actions.IRemoveCategoryAction => ({
  type: actions.REMOVE_CATEGORY,
  payload: id,
});

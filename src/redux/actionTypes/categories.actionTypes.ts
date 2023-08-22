import {
  IActionCategory,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "../../utils/Categories/interfaces";
import { ICategory } from "../../utils/types/interfaces";

export const GET_CATEGORIES = "categoriesActionType/GET_CATEGORIES";
export interface IGetCategoriesAction {
  type: typeof GET_CATEGORIES;
}

export const SET_CATEGORIES = "categoriesActionType/SET_CATEGORIES";
export interface ISetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: ICategory[];
}

export const SET_CATEGORIES_ERROR = "categoriesActionType/SET_CATEGORIES_ERROR";
export interface ISetCategoriesErrorAction {
  type: typeof SET_CATEGORIES_ERROR;
}

export const SET_CATEGORIES_PENDING =
  "categoriesActionType/SET_CATEGORIES_PENDING";
export interface ISetCategoriesPendingAction {
  type: typeof SET_CATEGORIES_PENDING;
}

export const CREATE_CATEGORY = "categoriesActionType/CREATE_CATEGORY";
export interface ICreateCategoryAction {
  type: typeof CREATE_CATEGORY;
  payload: ICreateCategoryRequest;
}

export const UPDATE_CATEGORY = "categoriesActionType/UPDATE_CATEGORY";
export interface IUpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: IUpdateCategoryRequest;
}

export const EDIT_CATEGORIES = "categoriesActionType/EDIT_CATEGORIES";
export interface IEditCategoriesAction {
  type: typeof EDIT_CATEGORIES;
  payload: Partial<IActionCategory>;
}

export const ADD_CATEGORY = "categoriesActionType/ADD_CATEGORY";
export interface IAddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: IActionCategory;
}

export const DELETE_CATEGORY = "categoriesActionType/DELETE_CATEGORY";
export interface IDeleteCategoryAction {
  type: typeof DELETE_CATEGORY;
  payload: number;
}

export const REMOVE_CATEGORY = "categoriesActionType/REMOVE_CATEGORY";
export interface IRemoveCategoryAction {
  type: typeof REMOVE_CATEGORY;
  payload: number;
}

export type categoriesAction =
  | ISetCategoriesAction
  | IEditCategoriesAction
  | IRemoveCategoryAction
  | IAddCategoryAction
  | ISetCategoriesErrorAction
  | ISetCategoriesPendingAction;

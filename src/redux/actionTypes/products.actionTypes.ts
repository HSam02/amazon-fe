import {
  IGetProductsResponse,
  ProductFilterType,
} from "../../utils/Products/interfaces";
import { IPagination, IProduct } from "../../utils/types/interfaces";

export const GET_USER_PRODUCTS = "productsActionType/GET_USER_PRODUCTS";
export interface IGetUserProductsAction {
  type: typeof GET_USER_PRODUCTS;
  payload?: IPagination;
}

export const GET_ALL_PRODUCTS = "productsActionType/GET_ALL_PRODUCTS";
export interface IGetAllProductsAction {
  type: typeof GET_ALL_PRODUCTS;
  payload: { pagination?: IPagination; filters?: ProductFilterType };
}

export const CREATE_PRODUCT = "productsActionTypes/CREATE_PRODUCT";
export interface ICreateProductAction {
  type: typeof CREATE_PRODUCT;
  payload: FormData;
}

export const UPDATE_PRODUCT = "productsActionTypes/UPDATE_PRODUCT";
export interface IUpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  payload: { id: number; formData: FormData };
}

export const DELETE_PRODUCT = "productsActionTypes/DELETE_PRODUCT";
export interface IDeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: number;
}

export const SET_PRODUCTS = "productsActionTypes/SET_PRODUCTS";
export interface ISetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: IGetProductsResponse;
}

export const ADD_PRODUCT = "productsActionTypes/ADD_PRODUCT";
export interface IAddProductAction {
  type: typeof ADD_PRODUCT;
  payload: IProduct;
}

export const EDIT_PRODUCT = "productsActionTypes/EDIT_PRODUCT";
export interface IEditProductAction {
  type: typeof EDIT_PRODUCT;
  payload: Partial<IProduct> & { editingId?: number };
}

export const REMOVE_PRODUCT = "productsActionTypes/REMOVE_PRODUCT";
export interface IRemoveProductAction {
  type: typeof REMOVE_PRODUCT;
  payload: number;
}

export const SET_PRODUCTS_SUCCESS = "productsActionTypes/SET_PRODUCTS_SUCCESS";
export interface ISetProductsSuccessAction {
  type: typeof SET_PRODUCTS_SUCCESS;
}

export const SET_PRODUCTS_PENDING = "productsActionTypes/SET_PRODUCTS_PENDING";
export interface ISetProductsPendingAction {
  type: typeof SET_PRODUCTS_PENDING;
}

export const SET_PRODUCTS_ERROR = "productsActionTypes/SET_PRODUCTS_ERROR";
export interface ISetProductsErrorAction {
  type: typeof SET_PRODUCTS_ERROR;
}

export const CLEAR_PRODUCTS_SLICE = "productsActionTypes/CLEAR_PRODUCTS_SLICE";
export interface IClearProductsSliceAction {
  type: typeof CLEAR_PRODUCTS_SLICE;
}

export type productsAction =
  | ISetProductsAction
  | ISetProductsSuccessAction
  | ISetProductsPendingAction
  | ISetProductsErrorAction
  | IAddProductAction
  | IEditProductAction
  | IRemoveProductAction
  | IClearProductsSliceAction;

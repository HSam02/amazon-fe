import { IActionSize } from "../../utils/Admin/interfaces";
import { ISize } from "../../utils/types/interfaces";

export const GET_SIZES = "sizesActionType/GET_SIZES";
export interface IGetSizesAction {
  type: typeof GET_SIZES;
}

export const SET_SIZES = "sizesActionType/SET_SIZES";
export interface ISetSizesAction {
  type: typeof SET_SIZES;
  payload: ISize[];
}

export const SET_SIZES_ERROR = "sizesActionType/SET_SIZES_ERROR";
export interface ISetSizesErrorAction {
  type: typeof SET_SIZES_ERROR;
}

export const SET_SIZES_PENDING = "sizesActionType/SET_SIZES_PENDING";
export interface ISetSizesPendingAction {
  type: typeof SET_SIZES_PENDING;
}

export const CREATE_SIZE = "sizesActionType/CREATE_SIZE";
export interface ICreateSizeAction {
  type: typeof CREATE_SIZE;
  payload: string;
}

export const UPDATE_SIZE = "sizesActionType/UPDATE_SIZE";
export interface IUpdateSizeAction {
  type: typeof UPDATE_SIZE;
  payload: ISize;
}

export const DELETE_SIZE = "sizesActionType/DELETE_SIZE";
export interface IDeleteSizeAction {
  type: typeof DELETE_SIZE;
  payload: number;
}

export const ADD_SIZE = "sizesActionType/ADD_SIZE";
export interface IAddSizeAction {
  type: typeof ADD_SIZE;
  payload: ISize;
}

export const EDIT_SIZE = "sizesActionType/EDIT_SIZE";
export interface IEditSizeAction {
  type: typeof EDIT_SIZE;
  payload: IActionSize;
}

export const REMOVE_SIZE = "sizesActionType/REMOVE_SIZE";
export interface IRemoveSizeAction {
  type: typeof REMOVE_SIZE;
  payload: number;
}

export type sizesAction =
  | ISetSizesAction
  | ISetSizesErrorAction
  | ISetSizesPendingAction
  | IAddSizeAction
  | IEditSizeAction
  | IRemoveSizeAction;

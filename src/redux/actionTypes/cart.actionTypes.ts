import { ICartItem } from "../../utils/types/interfaces";

export const GET_CART = "cartActionTypes/GET_CART";
export interface IGetCartAction {
  type: typeof GET_CART;
}

export const CREATE_CART_ITEM = "cartActionTypes/CREATE_CART_ITEM";
export interface ICreateCartItemAction {
  type: typeof CREATE_CART_ITEM;
  payload: Omit<ICartItem, "id" | "status">;
}

export const UPDATE_CART_ITEM = "cartActionTypes/UPDATE_CART_ITEM";
export interface IUpdateCartItemAction {
  type: typeof UPDATE_CART_ITEM;
  payload: Omit<ICartItem, "product">;
}

export const DELETE_CART_ITEM = "cartActionTypes/DELETE_CART_ITEM";
export interface IDeleteCartItemAction {
  type: typeof DELETE_CART_ITEM;
  payload: number;
}

export const SET_CART = "cartActionTypes/SET_CART";
export interface ISetCartAction {
  type: typeof SET_CART;
  payload: ICartItem[];
}

export const SET_CART_PENDING = "cartActionTypes/SET_CART_PENDING";
export interface ISetCartPendingAction {
  type: typeof SET_CART_PENDING;
}

export const SET_CART_ERROR = "cartActionTypes/SET_CART_ERROR";
export interface ISetCartErrorAction {
  type: typeof SET_CART_ERROR;
}

export const ADD_CART_ITEM = "cartActionTypes/ADD_CART_ITEM";
export interface IAddCartItemAction {
  type: typeof ADD_CART_ITEM;
  payload: ICartItem;
}

export const EDIT_CART_ITEM = "cartActionTypes/EDIT_CART_ITEM";
export interface IEditCartItemAction {
  type: typeof EDIT_CART_ITEM;
  payload: Partial<Omit<ICartItem, "product">> & { editingId?: number };
}

export const REMOVE_CART_ITEM = "cartActionTypes/REMOVE_CART_ITEM";
export interface IRemoveCartItemAction {
  type: typeof REMOVE_CART_ITEM;
  payload: number;
}

export type cartAction =
  | ISetCartAction
  | ISetCartErrorAction
  | ISetCartPendingAction
  | IAddCartItemAction
  | IEditCartItemAction
  | IRemoveCartItemAction;

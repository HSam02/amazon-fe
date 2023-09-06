import {
  ICreateOrderSchema,
  IGetOrdersResponse,
} from "../../utils/Orders/interfaces";
import { IPagination } from "../../utils/types/interfaces";

export const GET_ORDERS = "ordersActionTypes/GET_ORDERS";
export interface IGetOrdersAction {
  type: typeof GET_ORDERS;
  payload?: IPagination;
}

export const SET_ORDERS = "ordersActionTypes/SET_ORDERS";
export interface ISetOrdersAction {
  type: typeof SET_ORDERS;
  payload: IGetOrdersResponse;
}

export const SET_ORDERS_PENDING = "ordersActionTypes/SET_ORDERS_PENDING";
export interface ISetOrdersPendingAction {
  type: typeof SET_ORDERS_PENDING;
}

export const SET_ORDERS_ERROR = "ordersActionTypes/SET_ORDERS_ERROR";
export interface ISetOrdersErrorAction {
  type: typeof SET_ORDERS_ERROR;
}

// export const CREATE_ORDER = "ordersActionTypes/CREATE_ORDER";
// export interface ICreateOrderAction {
//   type: typeof CREATE_ORDER;
//   payload: ICreateOrderSchema;
// }

export const CLEAR_ORDERS_SLICE = "ordersActionTypes/CLEAR_ORDERS_SLICE";
export interface IClearOrdersSliceAction {
  type: typeof CLEAR_ORDERS_SLICE;
}

export type ordersAction =
  | ISetOrdersAction
  | ISetOrdersPendingAction
  | ISetOrdersErrorAction
  | IClearOrdersSliceAction;

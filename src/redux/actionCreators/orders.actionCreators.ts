import { IGetOrdersResponse } from "../../utils/Orders/interfaces";
import { IPagination } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/orders.actionTypes";

export const getOrders = (
  pagination?: IPagination
): actions.IGetOrdersAction => ({
  type: actions.GET_ORDERS,
  payload: pagination,
});

export const setOrders = (
  payload: IGetOrdersResponse
): actions.ISetOrdersAction => ({
  type: actions.SET_ORDERS,
  payload,
});

export const setOrdersPending = (): actions.ISetOrdersPendingAction => ({
  type: actions.SET_ORDERS_PENDING,
});

export const setOrdersError = (): actions.ISetOrdersErrorAction => ({
  type: actions.SET_ORDERS_ERROR,
});

export const clearOrdersSlice = (): actions.IClearOrdersSliceAction => ({
  type: actions.CLEAR_ORDERS_SLICE,
});

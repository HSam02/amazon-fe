import { IBuyLaterItem } from "../../utils/types/interfaces";

export const GET_BUYLATER = "buyLaterActionTypes/GET_BUYLATER";
export interface IGetBuyLaterAction {
  type: typeof GET_BUYLATER;
}

export const CREATE_BUYLATER_ITEM = "buyLaterActionTypes/CREATE_BUYLATER_ITEM";
export interface ICreateBuyLaterItemAction {
  type: typeof CREATE_BUYLATER_ITEM;
  payload: Omit<IBuyLaterItem, "id" | "status">;
}

export const DELETE_BUYLATER_ITEM = "buyLaterActionTypes/DELETE_BUYLATER_ITEM";
export interface IDeleteBuyLaterItemAction {
  type: typeof DELETE_BUYLATER_ITEM;
  payload: number;
}

export const SET_BUYLATER = "buyLaterActionTypes/SET_BUYLATER";
export interface ISetBuyLaterAction {
  type: typeof SET_BUYLATER;
  payload?: IBuyLaterItem[];
}

export const SET_BUYLATER_PENDING = "buyLaterActionTypes/SET_BUYLATER_PENDING";
export interface ISetBuyLaterPendingAction {
  type: typeof SET_BUYLATER_PENDING;
}

export const SET_BUYLATER_ERROR = "buyLaterActionTypes/SET_BUYLATER_ERROR";
export interface ISetBuyLaterErrorAction {
  type: typeof SET_BUYLATER_ERROR;
}

export const ADD_BUYLATER_ITEM = "buyLaterActionTypes/ADD_BUYLATER_ITEM";
export interface IAddBuyLaterItemAction {
  type: typeof ADD_BUYLATER_ITEM;
  payload: IBuyLaterItem;
}

export const EDIT_BUYLATER_ITEM = "buyLaterActionTypes/EDIT_BUYLATER_ITEM";
export interface IEditBuyLaterItemAction {
  type: typeof EDIT_BUYLATER_ITEM;
  payload: Partial<Omit<IBuyLaterItem, "product">> & { editingId?: number };
}

export const REMOVE_BUYLATER_ITEM = "buyLaterActionTypes/REMOVE_BUYLATER_ITEM";
export interface IRemoveBuyLaterItemAction {
  type: typeof REMOVE_BUYLATER_ITEM;
  payload: number;
}

export type buyLaterAction =
  | ISetBuyLaterAction
  | ISetBuyLaterErrorAction
  | ISetBuyLaterPendingAction
  | IAddBuyLaterItemAction
  | IEditBuyLaterItemAction
  | IRemoveBuyLaterItemAction;

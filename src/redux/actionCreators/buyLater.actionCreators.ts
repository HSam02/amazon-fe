import { IBuyLaterItem } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/buyLater.actionTypes";

export const getBuyLater = (): actions.IGetBuyLaterAction => ({
  type: actions.GET_BUYLATER,
});

export const createBuyLaterItem = (
  BuyLaterItem: Omit<IBuyLaterItem, "id" | "status">
): actions.ICreateBuyLaterItemAction => ({
  type: actions.CREATE_BUYLATER_ITEM,
  payload: BuyLaterItem,
});

export const deleteBuyLaterItem = (
  id: number
): actions.IDeleteBuyLaterItemAction => ({
  type: actions.DELETE_BUYLATER_ITEM,
  payload: id,
});

export const setBuyLater = (
  BuyLaterItems?: IBuyLaterItem[]
): actions.ISetBuyLaterAction => ({
  type: actions.SET_BUYLATER,
  payload: BuyLaterItems,
});

export const setBuyLaterPending = (): actions.ISetBuyLaterPendingAction => ({
  type: actions.SET_BUYLATER_PENDING,
});

export const setBuyLaterError = (): actions.ISetBuyLaterErrorAction => ({
  type: actions.SET_BUYLATER_ERROR,
});

export const addBuyLaterItem = (
  BuyLaterItem: IBuyLaterItem
): actions.IAddBuyLaterItemAction => ({
  type: actions.ADD_BUYLATER_ITEM,
  payload: BuyLaterItem,
});

export const editBuyLaterItem = (
  newData: Partial<Omit<IBuyLaterItem, "product">> & { editingId?: number }
): actions.IEditBuyLaterItemAction => ({
  type: actions.EDIT_BUYLATER_ITEM,
  payload: newData,
});

export const removeBuyLaterItem = (
  id: number
): actions.IRemoveBuyLaterItemAction => ({
  type: actions.REMOVE_BUYLATER_ITEM,
  payload: id,
});

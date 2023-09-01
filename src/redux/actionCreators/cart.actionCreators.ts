import { ICartItem } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/cart.actionTypes";

export const getCart = (): actions.IGetCartAction => ({
  type: actions.GET_CART,
});

export const createCartItem = (
  cartItem: ICartItem
): actions.ICreateCartItemAction => ({
  type: actions.CREATE_CART_ITEM,
  payload: cartItem,
});

export const updateCartItem = (
  newData: Omit<ICartItem, "product">
): actions.IUpdateCartItemAction => ({
  type: actions.UPDATE_CART_ITEM,
  payload: newData,
});

export const deleteCartItem = (id: number): actions.IDeleteCartItemAction => ({
  type: actions.DELETE_CART_ITEM,
  payload: id,
});

export const setCart = (cartItems: ICartItem[]): actions.ISetCartAction => ({
  type: actions.SET_CART,
  payload: cartItems,
});

export const setCartPending = (): actions.ISetCartPendingAction => ({
  type: actions.SET_CART_PENDING,
});

export const setCartError = (): actions.ISetCartErrorAction => ({
  type: actions.SET_CART_ERROR,
});

export const addCartItem = (
  cartItem: ICartItem
): actions.IAddCartItemAction => ({
  type: actions.ADD_CART_ITEM,
  payload: cartItem,
});

export const editCartItem = (
  newData: Partial<Omit<ICartItem, "product">> & { editingId?: number }
): actions.IEditCartItemAction => ({
  type: actions.EDIT_CART_ITEM,
  payload: newData,
});

export const removeCartItem = (id: number): actions.IRemoveCartItemAction => ({
  type: actions.REMOVE_CART_ITEM,
  payload: id,
});

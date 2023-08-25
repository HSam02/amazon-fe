import { IActionAddress } from "../../utils/Addresses/interfaces";
import { IAddress } from "../../utils/types/interfaces";

export const GET_ADDRESSES = "addressesActionType/GET_ADDRESSES";
export interface IGetAddressesAction {
  type: typeof GET_ADDRESSES;
}

export const SET_ADDRESSES = "addressesActionType/SET_ADDRESSES";
export interface ISetAddressesAction {
  type: typeof SET_ADDRESSES;
  payload: IAddress[];
}

export const SET_ADDRESSES_ERROR = "addressesActionType/SET_ADDRESSES_ERROR";
export interface ISetAddressesErrorAction {
  type: typeof SET_ADDRESSES_ERROR;
}

export const SET_ADDRESSES_PENDING = "addressesActionType/SET_ADDRESSES_PENDING";
export interface ISetAddressesPendingAction {
  type: typeof SET_ADDRESSES_PENDING;
}

export const CREATE_ADDRESS = "addressesActionType/CREATE_ADDRESS";
export interface ICreateAddressAction {
  type: typeof CREATE_ADDRESS;
  payload: string;
}

export const UPDATE_ADDRESS = "addressesActionType/UPDATE_ADDRESS";
export interface IUpdateAddressAction {
  type: typeof UPDATE_ADDRESS;
  payload: IAddress;
}

export const DELETE_ADDRESS = "addressesActionType/DELETE_ADDRESS";
export interface IDeleteAddressAction {
  type: typeof DELETE_ADDRESS;
  payload: number;
}

export const ADD_ADDRESS = "addressesActionType/ADD_ADDRESS";
export interface IAddAddressAction {
  type: typeof ADD_ADDRESS;
  payload: IAddress;
}

export const EDIT_ADDRESS = "addressesActionType/EDIT_ADDRESS";
export interface IEditAddressAction {
  type: typeof EDIT_ADDRESS;
  payload: IActionAddress;
}

export const REMOVE_ADDRESS = "addressesActionType/REMOVE_ADDRESS";
export interface IRemoveAddressAction {
  type: typeof REMOVE_ADDRESS;
  payload: number;
}

export type addressesAction =
  | ISetAddressesAction
  | ISetAddressesErrorAction
  | ISetAddressesPendingAction
  | IAddAddressAction
  | IEditAddressAction
  | IRemoveAddressAction;

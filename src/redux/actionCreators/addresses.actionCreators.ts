import { IActionAddress } from "../../utils/Addresses/interfaces";
import { IAddress } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/addresses.actionTypes";

export const getAddresses = (): actions.IGetAddressesAction => ({
  type: actions.GET_ADDRESSES,
});

export const setAddressesPending = (): actions.ISetAddressesPendingAction => ({
  type: actions.SET_ADDRESSES_PENDING,
});

export const setAddressesError = (): actions.ISetAddressesErrorAction => ({
  type: actions.SET_ADDRESSES_ERROR,
});

export const createAddress = (value: string): actions.ICreateAddressAction => ({
  type: actions.CREATE_ADDRESS,
  payload: value,
});

export const updateAddress = (address: IAddress): actions.IUpdateAddressAction => ({
  type: actions.UPDATE_ADDRESS,
  payload: address,
});

export const deleteAddress = (id: number): actions.IDeleteAddressAction => ({
  type: actions.DELETE_ADDRESS,
  payload: id,
});

export const setAddresses = (addresses: IAddress[]): actions.ISetAddressesAction => ({
  type: actions.SET_ADDRESSES,
  payload: addresses,
});

export const addAddress = (address: IAddress): actions.IAddAddressAction => ({
  type: actions.ADD_ADDRESS,
  payload: address,
});

export const editAddress = (address: IActionAddress): actions.IEditAddressAction => ({
  type: actions.EDIT_ADDRESS,
  payload: address,
});

export const removeAddress = (id: number): actions.IRemoveAddressAction => ({
  type: actions.REMOVE_ADDRESS,
  payload: id,
});

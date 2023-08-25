import { ILoginRequest, IRegisterRequest } from "../../utils/Auth/interfaces";
import { IUser } from "../../utils/types/interfaces";

export const LOGIN_USER = "userActionType/LOGIN_USER";
export interface ILoginUserAction {
  type: typeof LOGIN_USER;
  payload: ILoginRequest;
}

export const REGISTER_USER = "userActionType/REGISTER_USER";
export interface IRegisterUserAction {
  type: typeof REGISTER_USER;
  payload: IRegisterRequest;
}

export const GET_USER = "userActionType/GET_USER";
export interface IGetUserAction {
  type: typeof GET_USER;
}

export const SET_USER_DATA = "userActionType/SET_USER_DATA";
export interface ISetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: IUser | null;
}

export const SET_USER_ERROR = "userActionType/SET_USER_ERROR";
export interface ISetUserErrorAction {
  type: typeof SET_USER_ERROR;
}

export const SET_USER_PENDING = "userActionType/SET_USER_PENDING";
export interface ISetUserPendingAction {
  type: typeof SET_USER_PENDING;
}

export const LOGOUT = "userActionType/LOGOUT";
export interface ILogoutAction {
  type: typeof LOGOUT;
}

export const UPDATE_DEFAULT_ADDRESS = "userActionType/UPDATE_DEFAULT_ADDRESS";
export interface IUpdateDefaultAddressAction {
  type: typeof UPDATE_DEFAULT_ADDRESS;
  payload: number;
}

export const EDIT_DEFAULT_ADDRESS = "userActionType/EDIT_DEFAULT_ADDRESS";
export interface IEditDefaultAddressAction {
  type: typeof EDIT_DEFAULT_ADDRESS;
  payload: number;
}

export type userAction =
  | ISetUserDataAction
  | ISetUserErrorAction
  | ISetUserPendingAction
  | ILogoutAction
  | IEditDefaultAddressAction;

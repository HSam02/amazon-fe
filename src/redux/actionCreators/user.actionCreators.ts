import { ILoginRequest, IRegisterRequest } from "../../utils/Auth/interfaces";
import { IUser } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/user.actionTypes";

export const getUser = (): actions.IGetUserAction => ({
  type: actions.GET_USER,
});

export const loginUser = (
  loginData: ILoginRequest
): actions.ILoginUserAction => ({
  type: actions.LOGIN_USER,
  payload: loginData,
});

export const registerUser = (
  registerData: IRegisterRequest
): actions.IRegisterUserAction => ({
  type: actions.REGISTER_USER,
  payload: registerData,
});

export const setUserData = (
  user: IUser | null
): actions.ISetUserDataAction => ({
  type: actions.SET_USER_DATA,
  payload: user,
});

export const setUserError = (): actions.ISetUserErrorAction => ({
  type: actions.SET_USER_ERROR,
});

export const setUserPending = (): actions.ISetUserPendingAction => ({
  type: actions.SET_USER_PENDING,
});

export const logout = (): actions.ILogoutAction => ({
  type: actions.LOGOUT,
});

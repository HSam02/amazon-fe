import { IUser } from "../utils/types/interfaces";
import {
  IAuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "../utils/Auth/interfaces";
import { authEndpoints } from "../utils/types/endpoints";
import localStorageKeys from "../utils/types/localStorageKeys";
import appAxios from "./axios.service";

export const register = async (reqData: IRegisterRequest) => {
  try {
    const { data } = await appAxios.post<IAuthResponse>(
      authEndpoints.REGISTER,
      reqData
    );
    localStorage.setItem(localStorageKeys.TOKEN_KEY, data.token);
    return data.user;
  } catch (error) {
    throw error;
  }
};

export const login = async (reqData: ILoginRequest) => {
  try {
    const { data } = await appAxios.post<IAuthResponse>(
      authEndpoints.LOGIN,
      reqData
    );
    localStorage.setItem(localStorageKeys.TOKEN_KEY, data.token);
    return data.user;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const { data } = await appAxios.get<IUser>(authEndpoints.GET_USER);
    return data;
  } catch (error) {
    throw error;
  }
};

export const verify = async (email: string) => {
  try {
    const { data } = await appAxios.get<string>(authEndpoints.VERIFY + email);
    return data;
  } catch (error) {
    throw error;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const { data } = await appAxios.get<boolean>(
      authEndpoints.CHECK_EMAIL + email
    );

    return data;
  } catch (error) {
    throw error;
  }
};

import {
  ICartUpdateResponse,
  ICreateCartSchema,
  IUpdateCartSchema,
} from "../utils/Cart/interfaces";
import { ICartItem, ISuccessResponse } from "../utils/types/interfaces";
import { cartEndpoints } from "../utils/types/endpoints";
import { requestStatus } from "../utils/types/enums";
import appAxios from "./axios.service";

export const getCart = async () => {
  try {
    const { data } = await appAxios.get<ICartItem[]>(cartEndpoints.GET_MY);

    return data.map((item) => ({ ...item, status: requestStatus.SUCCESS }));
  } catch (error) {
    throw error;
  }
};

export const createCartItem = async (reqData: ICreateCartSchema) => {
  try {
    const { data } = await appAxios.post<ICartItem>(
      cartEndpoints.CREATE,
      reqData
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItem = async (
  id: number,
  reqData: IUpdateCartSchema
) => {
  try {
    const { data } = await appAxios.patch<ICartUpdateResponse>(
      cartEndpoints.UPDATE + id,
      reqData
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      cartEndpoints.REMOVE + id
    );

    return data.success;
  } catch (error) {
    throw error;
  }
};

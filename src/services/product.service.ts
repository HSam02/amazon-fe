import { productEndpoints } from "../utils/types/endpoints";
import { IProduct, ISuccessResponse } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const createProduct = async (reqData: FormData) => {
  try {
    const { data } = await appAxios.post<IProduct>(
      productEndpoints.CREATE,
      reqData
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id: number, reqData: FormData) => {
  try {
    const { data } = await appAxios.patch<ISuccessResponse>(
      productEndpoints.UPDATE + id,
      reqData
    );

    return data.success;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      productEndpoints.REMOVE + id
    );

    return data.success;
  } catch (error) {
    throw error;
  }
};

export const getUserProducts = async () => {
  try {
    const { data } = await appAxios.get<IProduct[]>(productEndpoints.GET_MY);

    return data;
  } catch (error) {
    throw error;
  }
};

import {
  IGetProductsResponse,
  IProductUpdateResponse,
  ProductFilterType,
} from "../utils/Products/interfaces";
import { productEndpoints } from "../utils/types/endpoints";
import {
  IPagination,
  IProduct,
  ISuccessResponse,
} from "../utils/types/interfaces";
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
    const { data } = await appAxios.patch<IProductUpdateResponse>(
      productEndpoints.UPDATE + id,
      reqData
    );

    return data;
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

export const getUserProducts = async (params?: IPagination) => {
  try {
    const { data } = await appAxios.get<IGetProductsResponse>(
      productEndpoints.GET_MY,
      {
        params: {
          limit: params?.limit,
          page: params?.page,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async (
  params?: IPagination,
  filters?: ProductFilterType
) => {
  try {
    const { data } = await appAxios.get<IGetProductsResponse>(
      productEndpoints.GET_ALL,
      {
        params: {
          limit: params?.limit,
          page: params?.page,
          ...filters,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

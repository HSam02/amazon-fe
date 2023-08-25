import { addressEndpoints } from "../utils/types/endpoints";
import { IAddress, ISuccessResponse } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const getAddresses = async () => {
  try {
    const { data } = await appAxios.get<IAddress[]>(addressEndpoints.GET_ALL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createAddress = async (value: string) => {
  try {
    const { data } = await appAxios.post<IAddress>(addressEndpoints.CREATE, {
      value,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async ({ id, value }: IAddress) => {
  try {
    const { data } = await appAxios.patch<IAddress>(
      addressEndpoints.UPDATE + id,
      {
        value,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeAddress = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      addressEndpoints.REMOVE + id
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

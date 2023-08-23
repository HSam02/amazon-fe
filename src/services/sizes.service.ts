import { sizeEndpoints } from "../utils/types/endpoints";
import { ISize, ISuccessResponse } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const getSizes = async () => {
  try {
    const { data } = await appAxios.get<ISize[]>(sizeEndpoints.GET_ALL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createSize = async (value: string) => {
  try {
    const { data } = await appAxios.post<ISize>(sizeEndpoints.CREATE, {
      value,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateSize = async ({ id, value }: ISize) => {
  try {
    const { data } = await appAxios.patch<ISuccessResponse>(
      sizeEndpoints.UPDATE + id,
      {
        value,
      }
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

export const removeSize = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      sizeEndpoints.REMOVE + id
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

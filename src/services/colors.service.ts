import { colorEndpoints } from "../utils/types/endpoints";
import { IColor, ISuccessResponse } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const getColors = async () => {
  try {
    const { data } = await appAxios.get<IColor[]>(colorEndpoints.GET_ALL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createColor = async (value: string) => {
  try {
    const { data } = await appAxios.post<IColor>(colorEndpoints.CREATE, {
      value,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateColor = async ({ id, value }: IColor) => {
  try {
    const { data } = await appAxios.patch<ISuccessResponse>(
      colorEndpoints.UPDATE + id,
      {
        value,
      }
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

export const removeColor = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      colorEndpoints.REMOVE + id
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

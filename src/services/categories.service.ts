import {
  ICategoryResponse,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "../utils/Admin/interfaces";
import { categoryEndpoints } from "../utils/types/endpoints";
import { ICategory, ISuccessResponse } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const getCategories = async () => {
  try {
    const { data } = await appAxios.get<ICategory[]>(categoryEndpoints.GET_ALL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (reqData: ICreateCategoryRequest) => {
  try {
    const { data } = await appAxios.post<ICategoryResponse>(
      categoryEndpoints.CREATE,
      reqData
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async ({ id, title }: IUpdateCategoryRequest) => {
  try {
    const { data } = await appAxios.patch<ISuccessResponse>(
      categoryEndpoints.UPDATE + id,
      {
        title,
      }
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

export const removeCategory = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      categoryEndpoints.REMOVE + id
    );
    return data.success;
  } catch (error) {
    throw error;
  }
};

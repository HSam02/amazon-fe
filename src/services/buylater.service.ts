import { ICreateCartSchema } from "../utils/Cart/interfaces";
import { buyLaterEndpoints } from "../utils/types/endpoints";
import { IBuyLaterItem, ISuccessResponse } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const getBuyLater = async () => {
  try {
    const { data } = await appAxios.get<IBuyLaterItem[]>(
      buyLaterEndpoints.GET_MY
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const createBuyLaterItem = async (reqData: ICreateCartSchema) => {
  try {
    const { data } = await appAxios.post<IBuyLaterItem>(
      buyLaterEndpoints.CREATE,
      reqData
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteBuyLaterItem = async (id: number) => {
  try {
    const { data } = await appAxios.delete<ISuccessResponse>(
      buyLaterEndpoints.REMOVE + id
    );

    return data.success;
  } catch (error) {
    throw error;
  }
};

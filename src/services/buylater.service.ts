import { ICreateBuyLaterSchema } from "../utils/Cart/interfaces";
import { IBuyLaterItem, ISuccessResponse } from "../utils/types/interfaces";
import { buyLaterEndpoints } from "../utils/types/endpoints";
import { requestStatus } from "../utils/types/enums";
import appAxios from "./axios.service";

export const getBuyLater = async () => {
  try {
    const { data } = await appAxios.get<IBuyLaterItem[]>(
      buyLaterEndpoints.GET_MY
    );

    return data.map((item) => ({ ...item, status: requestStatus.SUCCESS }));
  } catch (error) {
    throw error;
  }
};

export const createBuyLaterItem = async (reqData: ICreateBuyLaterSchema) => {
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

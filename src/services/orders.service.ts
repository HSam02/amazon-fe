import { ICreateOrderSchema } from "../utils/Orders/interfaces";
import { orderEndpoints } from "../utils/types/endpoints";
import { IOrder } from "../utils/types/interfaces";
import appAxios from "./axios.service";

export const getOrders = async () => {
  try {
    const { data } = await appAxios.get<IOrder[]>(orderEndpoints.GET_MY);

    return data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (reqData: ICreateOrderSchema) => {
  try {
    const { data } = await appAxios.post<IOrder>(
      orderEndpoints.CREATE,
      reqData
    );

    return data;
  } catch (error) {
    throw error;
  }
};

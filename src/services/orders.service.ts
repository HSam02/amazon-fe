import {
  ICreateOrderSchema,
  IGetOrdersResponse,
} from "../utils/Orders/interfaces";
import { IOrder, IPagination } from "../utils/types/interfaces";
import { orderEndpoints } from "../utils/types/endpoints";
import appAxios from "./axios.service";

export const getOrders = async (params?: IPagination) => {
  try {
    const { data } = await appAxios.get<IGetOrdersResponse>(
      orderEndpoints.GET_MY,
      { params }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

// export const createOrder = async (reqData: ICreateOrderSchema) => {
//   try {
//     const { data } = await appAxios.post<IOrder>(
//       orderEndpoints.CREATE,
//       reqData
//     );

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

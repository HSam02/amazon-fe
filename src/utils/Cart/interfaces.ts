import { ICartItem } from "../types/interfaces";

export interface ICreateCartSchema {
  productId: number;
  sizeId: number;
  colorId: number;
  quantity: number;
}
export interface IUpdateCartSchema {
  sizeId?: number;
  colorId?: number;
  quantity?: number;
}

export interface ICartUpdateResponse {
  cartItem: ICartItem;
  success: boolean;
}

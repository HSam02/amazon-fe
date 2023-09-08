import { requestStatus, roles } from "./enums";

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: roles;
  defaultAddressId?: number;
}

export interface ICategory {
  id: number;
  title: string;
  status: requestStatus;
  subCategories: ICategory[];
}

export interface ISize {
  id: number;
  value: string;
  status: requestStatus;
}

export interface IColor extends ISize {}

export interface ISuccessResponse {
  success: boolean;
}

export interface IAddress {
  id: number;
  value: string;
  status: requestStatus;
}

export interface IImage {
  id: number;
  url: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  brand: string;
  price: string;
  isAvailable: boolean;
  user: Omit<IUser, "email" | "role" | "defaultAddressId">;
  category: {
    id: number;
    title: string;
  } | null;
  defaultImg: IImage | null;
  images: IImage[];
  sizes: Omit<ISize, "status">[];
  colors: Omit<IColor, "status">[];
  status: requestStatus;
  statistic?: {
    totalCount: number;
    totalPrice: number;
  };
}

export interface IPagination {
  count: number;
  page: number;
  limit: number;
}

export interface ICartItem {
  id: number;
  product: Omit<IProduct, "status">;
  size: Omit<ISize, "status">;
  color: Omit<IColor, "status">;
  quantity: number;
  status: requestStatus;
}

export interface IBuyLaterItem {
  id: number;
  product: Omit<IProduct, "status">;
  size: Omit<ISize, "status">;
  color: Omit<IColor, "status">;
  status: requestStatus;
}

export interface IOrder {
  id: number;
  address: string;
  products: Array<
    Pick<IProduct, "id" | "name" | "price" | "defaultImg"> & {
      quantity: number;
      size: string;
      color: string;
    }
  >;
}

export type ITranslationKeys  ={
  home: string;
  cart: string;
  my_profile: string;
  my_store: string;
  my_orders: string;
  settings: string;
  admin: string;
  sign: string;
  add_product: string;
}

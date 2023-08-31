import { IPagination, IProduct, ISuccessResponse } from "../types/interfaces";

export interface IProductCreateSchema {
  name: string;
  description?: string;
  brand: string;
  price: string;
  categoryId: number;
  isAvailable?: boolean;
  sizeIds: number[];
  colorIds: number[];
}

export interface IProductUpdateSchema {
  name?: string;
  description?: string;
  brand?: string;
  price?: string;
  categoryId?: number;
  isAvailable?: boolean;
  defaultImageId: number;
  sizeIds?: number[];
  colorIds?: number[];
  imageIds?: number[];
}

export interface IProductUpdateResponse extends ISuccessResponse {
  product?: IProduct;
}

export interface IGetProductsResponse {
  products: IProduct[];
  pagination: IPagination;
}

export type ProductFilterType = Partial<
  Omit<IProductCreateSchema, "isAvailable" | "description" | "price">
>;

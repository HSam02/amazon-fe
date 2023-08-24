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
}

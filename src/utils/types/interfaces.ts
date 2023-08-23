import { requestStatus, roles } from "./enums";

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: roles;
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

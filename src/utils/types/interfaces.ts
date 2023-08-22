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
}

export interface IColor {
  id: number;
  value: string;
}

export interface ISuccessResponse {
  success: boolean;
}

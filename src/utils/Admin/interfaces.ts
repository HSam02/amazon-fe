import { adminTools, requestStatus } from "../types/enums";
import { ISize } from "../types/interfaces";

export interface ICreateCategoryRequest {
  title: string;
  parentId?: number | null;
}

export interface ICategoryResponse extends ICreateCategoryRequest {
  id: number;
}

export interface IUpdateCategoryRequest {
  id: number;
  title: string;
}

export interface IActionCategory extends ICategoryResponse {
  editingId: number;
  status: requestStatus;
}

export interface IActionSize extends ISize {
  editingId?: number;
}

export interface IActionColor extends IActionSize {}

export interface IItem {
  id: number;
  title: string;
  type: adminTools;
  status: requestStatus;
}
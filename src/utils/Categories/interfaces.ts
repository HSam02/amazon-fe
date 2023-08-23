import { requestStatus } from "../types/enums";

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

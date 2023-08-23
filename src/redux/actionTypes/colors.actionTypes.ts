import { IActionColor } from "../../utils/Admin/interfaces";
import { IColor } from "../../utils/types/interfaces";

export const GET_COLORS = "colorsActionType/GET_COLORS";
export interface IGetColorsAction {
  type: typeof GET_COLORS;
}

export const SET_COLORS = "colorsActionType/SET_COLORS";
export interface ISetColorsAction {
  type: typeof SET_COLORS;
  payload: IColor[];
}

export const SET_COLORS_ERROR = "colorsActionType/SET_COLORS_ERROR";
export interface ISetColorsErrorAction {
  type: typeof SET_COLORS_ERROR;
}

export const SET_COLORS_PENDING = "colorsActionType/SET_COLORS_PENDING";
export interface ISetColorsPendingAction {
  type: typeof SET_COLORS_PENDING;
}

export const CREATE_COLOR = "colorsActionType/CREATE_COLOR";
export interface ICreateColorAction {
  type: typeof CREATE_COLOR;
  payload: string;
}

export const UPDATE_COLOR = "colorsActionType/UPDATE_COLOR";
export interface IUpdateColorAction {
  type: typeof UPDATE_COLOR;
  payload: IColor;
}

export const DELETE_COLOR = "colorsActionType/DELETE_COLOR";
export interface IDeleteColorAction {
  type: typeof DELETE_COLOR;
  payload: number;
}

export const ADD_COLOR = "colorsActionType/ADD_COLOR";
export interface IAddColorAction {
  type: typeof ADD_COLOR;
  payload: IColor;
}

export const EDIT_COLOR = "colorsActionType/EDIT_COLOR";
export interface IEditColorAction {
  type: typeof EDIT_COLOR;
  payload: IActionColor;
}

export const REMOVE_COLOR = "colorsActionType/REMOVE_COLOR";
export interface IRemoveColorAction {
  type: typeof REMOVE_COLOR;
  payload: number;
}

export type colorsAction =
  | ISetColorsAction
  | ISetColorsErrorAction
  | ISetColorsPendingAction
  | IAddColorAction
  | IEditColorAction
  | IRemoveColorAction;

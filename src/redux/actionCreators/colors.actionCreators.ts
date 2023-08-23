import { IActionColor } from "../../utils/Admin/interfaces";
import { IColor } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/colors.actionTypes";

export const getColors = (): actions.IGetColorsAction => ({
  type: actions.GET_COLORS,
});

export const setColorsPending = (): actions.ISetColorsPendingAction => ({
  type: actions.SET_COLORS_PENDING,
});

export const setColorsError = (): actions.ISetColorsErrorAction => ({
  type: actions.SET_COLORS_ERROR,
});

export const createColor = (value: string): actions.ICreateColorAction => ({
  type: actions.CREATE_COLOR,
  payload: value,
});

export const updateColor = (color: IColor): actions.IUpdateColorAction => ({
  type: actions.UPDATE_COLOR,
  payload: color,
});

export const deleteColor = (id: number): actions.IDeleteColorAction => ({
  type: actions.DELETE_COLOR,
  payload: id,
});

export const setColors = (colors: IColor[]): actions.ISetColorsAction => ({
  type: actions.SET_COLORS,
  payload: colors,
});

export const addColor = (color: IColor): actions.IAddColorAction => ({
  type: actions.ADD_COLOR,
  payload: color,
});

export const editColor = (color: IActionColor): actions.IEditColorAction => ({
  type: actions.EDIT_COLOR,
  payload: color,
});

export const removeColor = (id: number): actions.IRemoveColorAction => ({
  type: actions.REMOVE_COLOR,
  payload: id,
});

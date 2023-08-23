import { ISize } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/sizes.actionTypes";

export const getSizes = (): actions.IGetSizesAction => ({
  type: actions.GET_SIZES,
});

export const setSizesPending = (): actions.ISetSizesPendingAction => ({
  type: actions.SET_SIZES_PENDING,
});

export const setSizesError = (): actions.ISetSizesErrorAction => ({
  type: actions.SET_SIZES_ERROR,
});

export const createSize = (value: string): actions.ICreateSizeAction => ({
  type: actions.CREATE_SIZE,
  payload: value,
});

export const updateSize = (size: ISize): actions.IUpdateSizeAction => ({
  type: actions.UPDATE_SIZE,
  payload: size,
});

export const deleteSize = (id: number): actions.IDeleteSizeAction => ({
  type: actions.DELETE_SIZE,
  payload: id,
});

export const setSizes = (sizes: ISize[]): actions.ISetSizesAction => ({
  type: actions.SET_SIZES,
  payload: sizes,
});

export const addSize = (size: ISize): actions.IAddSizeAction => ({
  type: actions.ADD_SIZE,
  payload: size,
});

export const editSize = (size: ISize): actions.IEditSizeAction => ({
  type: actions.EDIT_SIZE,
  payload: size,
});

export const removeSize = (id: number): actions.IRemoveSizeAction => ({
  type: actions.REMOVE_SIZE,
  payload: id,
});

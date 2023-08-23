import { requestStatus } from "../../utils/types/enums";
import { IColor } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/colors.actionTypes";

interface IColorsState {
  colors: IColor[] | null;
  status: requestStatus;
}

const initialState: IColorsState = {
  colors: null,
  status: requestStatus.IDLE,
};

const colorsReducer = (
  state = initialState,
  action: actions.colorsAction
): IColorsState => {
  switch (action.type) {
    case actions.SET_COLORS_PENDING: {
      return {
        colors: null,
        status: requestStatus.PENDING,
      };
    }
    case actions.SET_COLORS_ERROR: {
      return {
        colors: null,
        status: requestStatus.ERROR,
      };
    }
    case actions.SET_COLORS: {
      return {
        colors: action.payload,
        status: requestStatus.SUCCESS,
      };
    }
    case actions.ADD_COLOR: {
      return {
        ...state,
        colors: state.colors ? [...state.colors, action.payload] : state.colors,
      };
    }
    case actions.EDIT_COLOR: {
      const { editingId, ...newData } = action.payload;
      return {
        ...state,
        colors:
          state.colors?.map((color) =>
            (
              editingId
                ? color.id === editingId
                : color.id === action.payload.id
            )
              ? {
                  ...color,
                  ...newData,
                }
              : color
          ) || state.colors,
      };
    }
    case actions.REMOVE_COLOR: {
      return {
        ...state,
        colors:
          state.colors?.filter((color) => color.id !== action.payload) ||
          state.colors,
      };
    }
    default: {
      return state;
    }
  }
};

export default colorsReducer;

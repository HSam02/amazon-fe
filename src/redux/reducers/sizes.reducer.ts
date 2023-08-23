import { requestStatus } from "../../utils/types/enums";
import { ISize } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/sizes.actionTypes";

interface ISizesState {
  sizes: ISize[] | null;
  status: requestStatus;
}

const initialState: ISizesState = {
  sizes: null,
  status: requestStatus.IDLE,
};

const sizesReducer = (
  state = initialState,
  action: actions.sizesAction
): ISizesState => {
  switch (action.type) {
    case actions.SET_SIZES_PENDING: {
      return {
        sizes: null,
        status: requestStatus.PENDING,
      };
    }
    case actions.SET_SIZES_ERROR: {
      return {
        sizes: null,
        status: requestStatus.ERROR,
      };
    }
    case actions.SET_SIZES: {
      return {
        sizes: action.payload,
        status: requestStatus.SUCCESS,
      };
    }
    case actions.ADD_SIZE: {
      return {
        ...state,
        sizes: state.sizes ? [...state.sizes, action.payload] : state.sizes,
      };
    }
    case actions.EDIT_SIZE: {
      return {
        ...state,
        sizes:
          state.sizes?.map((size) =>
            size.id === action.payload.id
              ? {
                  ...size,
                  ...action.payload,
                }
              : size
          ) || state.sizes,
      };
    }
    case actions.REMOVE_SIZE: {
      return {
        ...state,
        sizes:
          state.sizes?.filter((size) => size.id !== action.payload) ||
          state.sizes,
      };
    }
    default: {
      return state;
    }
  }
};

export default sizesReducer;

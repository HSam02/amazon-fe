import { requestStatus } from "../../utils/types/enums";
import { IBuyLaterItem } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/buyLater.actionTypes";

interface IBuyLaterState {
  buyLaterItems: IBuyLaterItem[] | null;
  status: requestStatus;
}

const initialState: IBuyLaterState = {
  buyLaterItems: null,
  status: requestStatus.IDLE,
};

const buyLaterReducer = (
  state = initialState,
  action: actions.buyLaterAction
): IBuyLaterState => {
  switch (action.type) {
    case actions.SET_BUYLATER_PENDING: {
      return {
        ...state,
        status: requestStatus.PENDING,
      };
    }

    case actions.SET_BUYLATER_ERROR: {
      return {
        ...state,
        status: requestStatus.ERROR,
      };
    }

    case actions.SET_BUYLATER: {
      return {
        buyLaterItems: action.payload || state.buyLaterItems,
        status: requestStatus.SUCCESS,
      };
    }

    case actions.ADD_BUYLATER_ITEM: {
      return {
        ...state,
        buyLaterItems: state.buyLaterItems
          ? [action.payload, ...state.buyLaterItems]
          : [action.payload],
      };
    }

    case actions.EDIT_BUYLATER_ITEM: {
      const { editingId, ...newData } = action.payload;
      const editId = editingId || newData.id;

      return state.buyLaterItems
        ? {
            ...state,
            buyLaterItems: state.buyLaterItems.map((item) =>
              item.id === editId ? { ...item, ...newData } : item
            ),
          }
        : state;
    }

    case actions.REMOVE_BUYLATER_ITEM: {
      return state.buyLaterItems
        ? {
            ...state,
            buyLaterItems: state.buyLaterItems.filter(
              ({ id }) => id !== action.payload
            ),
          }
        : state;
    }

    default: {
      return state;
    }
  }
};

export default buyLaterReducer;

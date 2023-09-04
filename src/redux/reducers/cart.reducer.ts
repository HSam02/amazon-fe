import { requestStatus } from "../../utils/types/enums";
import { ICartItem } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/cart.actionTypes";

interface ICartState {
  cartItems: ICartItem[] | null;
  status: requestStatus;
}

const initialState: ICartState = {
  cartItems: null,
  status: requestStatus.IDLE,
};

const cartReducer = (
  state = initialState,
  action: actions.cartAction
): ICartState => {
  switch (action.type) {
    case actions.SET_CART_PENDING: {
      return {
        ...state,
        status: requestStatus.PENDING,
      };
    }

    case actions.SET_CART_ERROR: {
      return {
        ...state,
        status: requestStatus.ERROR,
      };
    }

    case actions.SET_CART: {
      return {
        cartItems: action.payload || state.cartItems,
        status: requestStatus.SUCCESS,
      };
    }

    case actions.ADD_CART_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems
          ? [action.payload, ...state.cartItems]
          : [action.payload],
      };
    }

    case actions.EDIT_CART_ITEM: {
      const { editingId, ...newData } = action.payload;
      const editId = editingId || newData.id;

      return state.cartItems
        ? {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === editId ? { ...item, ...newData } : item
            ),
          }
        : state;
    }

    case actions.REMOVE_CART_ITEM: {
      return state.cartItems
        ? {
            ...state,
            cartItems: state.cartItems.filter(
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

export default cartReducer;

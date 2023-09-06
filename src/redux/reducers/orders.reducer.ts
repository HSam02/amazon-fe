import { requestStatus } from "../../utils/types/enums";
import { IOrder, IPagination } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/orders.actionTypes";

interface IOrdersState {
  orders: IOrder[] | null;
  pagination: IPagination | null;
  status: requestStatus;
}

const initialState: IOrdersState = {
  orders: null,
  pagination: null,
  status: requestStatus.IDLE,
};

const ordersReducer = (
  state = initialState,
  action: actions.ordersAction
): IOrdersState => {
  switch (action.type) {
    case actions.SET_ORDERS_PENDING: {
      return {
        ...state,
        status: requestStatus.PENDING,
      };
    }

    case actions.SET_ORDERS_ERROR: {
      return {
        ...state,
        status: requestStatus.ERROR,
      };
    }

    case actions.CLEAR_ORDERS_SLICE: {
      return initialState;
    }

    case actions.SET_ORDERS: {
      const { pagination, orders } = action.payload;

      return {
        orders: state.orders ? [...state.orders, ...orders] : orders,
        pagination,
        status: requestStatus.SUCCESS,
      };
    }

    default: {
      return state;
    }
  }
};

export default ordersReducer;

import { requestStatus } from "../../utils/types/enums";
import { IProduct } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/products.actionTypes";

interface IProductState {
  products: IProduct[] | null;
  status: requestStatus;
}

const initialState: IProductState = {
  products: null,
  status: requestStatus.IDLE,
};

const productsReducer = (
  state = initialState,
  action: actions.productsAction
): IProductState => {
  switch (action.type) {
    case actions.SET_PRODUCTS_PENDING: {
      return {
        ...state,
        status: requestStatus.PENDING,
      };
    }

    case actions.SET_PRODUCTS_ERROR: {
      return {
        ...state,
        status: requestStatus.ERROR,
      };
    }

    case actions.SET_PRODUCTS: {
      return {
        products: action.payload,
        status: requestStatus.SUCCESS,
      };
    }

    case actions.ADD_PRODUCT: {
      return {
        ...state,
        products: state.products
          ? [action.payload, ...state.products.slice(0, -1)]
          : [action.payload],
      };
    }

    case actions.EDIT_PRODUCT: {
      const { id } = action.payload;
      return state.products
        ? {
            ...state,
            products: state.products.map((product) =>
              product.id === id ? { ...product, ...action.payload } : product
            ),
          }
        : state;
    }

    case actions.REMOVE_PRODUCT: {
      return state.products
        ? {
            ...state,
            products: state.products.filter(
              (product) => product.id !== action.payload
            ),
          }
        : state;
    }

    default: {
      return state;
    }
  }
};

export default productsReducer;

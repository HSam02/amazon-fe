import { requestStatus } from "../../utils/types/enums";
import { IPagination, IProduct } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/products.actionTypes";

interface IProductState {
  products: IProduct[] | null;
  pagination: IPagination | null;
  status: requestStatus;
}

const initialState: IProductState = {
  products: null,
  pagination: null,
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
      const { pagination, products } = action.payload;
      const newProducts = products.map((product) => ({
        ...product,
        status: requestStatus.SUCCESS,
      }));
      return {
        products: state.products
          ? [...state.products, ...newProducts]
          : newProducts,
        pagination,
        status: requestStatus.SUCCESS,
      };
    }

    case actions.ADD_PRODUCT: {
      return {
        ...state,
        products: state.products
          ? [
              action.payload,
              ...(state.products.length % 10 === 0
                ? state.products.slice(0, -1)
                : state.products),
            ]
          : [action.payload],
      };
    }

    case actions.EDIT_PRODUCT: {
      const { editingId, ...newData } = action.payload;
      const editId = editingId || newData.id;
      return state.products
        ? {
            ...state,
            products: state.products.map((product) =>
              product.id === editId ? { ...product, ...newData } : product
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

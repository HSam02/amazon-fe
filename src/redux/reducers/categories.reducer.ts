import {
  addCategoryRecursively,
  deleteCategoryRecursively,
  editCategoryRecursively,
} from "../../utils/Categories/helperFunctions";
import { requestStatus } from "../../utils/types/enums";
import { ICategory } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/categories.actionTypes";

interface ICategoryState {
  categories: ICategory[] | null;
  status: requestStatus | null;
}

const initialState: ICategoryState = {
  categories: null,
  status: null,
};

const categoriesReducer = (
  state = initialState,
  action: actions.categoriesAction
): ICategoryState => {
  switch (action.type) {
    case actions.SET_CATEGORIES: {
      return {
        categories: action.payload,
        status: requestStatus.SUCCESS,
      };
    }
    case actions.ADD_CATEGORY: {
      return state.categories
        ? {
            ...state,
            categories: addCategoryRecursively(
              state.categories,
              action.payload
            ),
          }
        : state;
    }
    case actions.EDIT_CATEGORIES: {
      const { parentId, editingId, ...newCategory } = action.payload;
      const newCategories = state.categories
        ? editCategoryRecursively(state.categories, newCategory, editingId)
        : state.categories;
      return { ...state, categories: newCategories };
    }
    case actions.REMOVE_CATEGORY: {
      return state.categories
        ? {
            ...state,
            categories: deleteCategoryRecursively(
              state.categories,
              action.payload
            ),
          }
        : state;
    }
    case actions.SET_CATEGORIES_PENDING: {
      return {
        categories: null,
        status: requestStatus.PENDING,
      };
    }
    case actions.SET_CATEGORIES_ERROR: {
      return {
        categories: null,
        status: requestStatus.ERROR,
      };
    }
    default: {
      return state;
    }
  }
};

export default categoriesReducer;

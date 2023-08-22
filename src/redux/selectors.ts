import { AppState } from "./reducers/rootReducer";

export const selectUser = (state: AppState) => state.user;

export const selectCategories = (state: AppState) => state.categories;

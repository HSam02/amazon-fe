import { AppState } from "./reducers/rootReducer";

export const selectUser = (state: AppState) => state.user;

export const selectCategories = (state: AppState) => state.categories;

export const selectSizes = (state: AppState) => state.sizes;

export const selectColors = (state: AppState) => state.colors;

export const selectAddresses = (state: AppState) => state.addresses;

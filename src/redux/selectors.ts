import { AppState } from "./reducers/rootReducer";

export const selectUser = (state: AppState) => state.user;

export const selectCategories = (state: AppState) => state.categories;

export const selectSizes = (state: AppState) => state.sizes;

export const selectColors = (state: AppState) => state.colors;

export const selectAddresses = (state: AppState) => state.addresses;

export const selectProducts = (state: AppState) => state.products;

export const selectCart = (state: AppState) => state.cart;

export const selectBuyLater = (state: AppState) => state.buyLater;

export const selectOrders = (state: AppState) => state.orders;

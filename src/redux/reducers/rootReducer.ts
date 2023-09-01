import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import categoriesReducer from "./categories.reducer";
import sizesReducer from "./sizes.reducer";
import colorsReducer from "./colors.reducer";
import addressesReducer from "./addresses.reducer";
import productsReducer from "./products.reducer";
import cartReducer from "./cart.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  sizes: sizesReducer,
  colors: colorsReducer,
  addresses: addressesReducer,
  products: productsReducer,
  cart: cartReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

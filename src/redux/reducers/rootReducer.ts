import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import categoriesReducer from "./categories.reducer";
import sizesReducer from "./sizes.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  sizes: sizesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

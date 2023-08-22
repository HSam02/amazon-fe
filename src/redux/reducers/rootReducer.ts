import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import categoriesReducer from "./categories.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { AppState } from "./reducers/rootReducer";

export const selectUser = (state: AppState) => state.user;

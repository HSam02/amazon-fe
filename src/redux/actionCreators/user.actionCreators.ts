import * as actions from "../actionTypes/user.actionTypes";
import { IUser } from "../reducers/user.reducer";

export const setUser = (user: IUser): actions.ISetUserAction => ({
  type: actions.SET_USER,
  user,
});

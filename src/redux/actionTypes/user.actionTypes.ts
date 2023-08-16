import { IUser } from "../reducers/user.reducer";

export const SET_USER = "userActionType/SET_USER";
export interface ISetUserAction {
  type: typeof SET_USER;
  user: IUser;
}

import { requestStatus } from "../../utils/types";

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserState {
  user: IUser | null;
  status: requestStatus;
}

const initialState: IUserState = {
  user: null,
  status: requestStatus.IDLE,
};

const userReducer = (state = initialState, action: { type: string }) => {
  return state;
};

export default userReducer;

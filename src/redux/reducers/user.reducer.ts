import { requestStatus } from "../../utils/types/enums";
import { IUser } from "../../utils/types/interfaces";
import localStorageKeys from "../../utils/types/localStorageKeys";
import * as actions from "../actionTypes/user.actionTypes";

export interface IUserState {
  user: IUser | null;
  status: requestStatus;
}

const initialState: IUserState = {
  user: null,
  status: requestStatus.IDLE,
};

const userReducer = (
  state = initialState,
  action: actions.userAction
): IUserState => {
  switch (action.type) {
    case actions.SET_USER_DATA: {
      return {
        user: action.payload,
        status: requestStatus.SUCCESS,
      };
    }
    case actions.SET_USER_ERROR: {
      return {
        user: null,
        status: requestStatus.ERROR,
      };
    }
    case actions.SET_USER_PENDING: {
      return {
        user: null,
        status: requestStatus.PENDING,
      };
    }
    case actions.LOGOUT: {
      localStorage.removeItem(localStorageKeys.TOKEN_KEY);
      return {
        user: null,
        status: requestStatus.SUCCESS,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

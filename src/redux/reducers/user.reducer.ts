import { requestStatus } from "../../utils/types/enums";
import { IUser } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/user.actionTypes";

export interface IUserState {
  user: IUser | null;
  status: requestStatus | null;
}

const initialState: IUserState = {
  user: null,
  status: null,
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
    default: {
      return state;
    }
  }
};

export default userReducer;

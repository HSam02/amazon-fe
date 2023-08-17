import { requestStatus } from "../../utils/types/enums";
import { IUser } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/user.actionTypes";

interface IUserState {
  user: IUser | null;
  status: requestStatus;
}

const initialState: IUserState = {
  user: null,
  status: requestStatus.IDLE,
};

const userReducer = (state = initialState, action: actions.userAction) => {
  switch (action.type) {
    case actions.SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
        status: requestStatus.IDLE,
      };
    }
    case actions.SET_USER_ERROR: {
      return {
        ...state,
        user: null,
        status: requestStatus.ERROR,
      };
    }
    case actions.SET_USER_PENDING: {
      return {
        ...state,
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

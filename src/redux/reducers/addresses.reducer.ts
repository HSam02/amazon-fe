import { requestStatus } from "../../utils/types/enums";
import { IAddress } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/addresses.actionTypes";

interface IAddressesState {
  addresses: IAddress[] | null;
  status: requestStatus;
}

const initialState: IAddressesState = {
  addresses: null,
  status: requestStatus.IDLE,
};

const addressesReducer = (
  state = initialState,
  action: actions.addressesAction
): IAddressesState => {
  switch (action.type) {
    case actions.SET_ADDRESSES_PENDING: {
      return {
        addresses: null,
        status: requestStatus.PENDING,
      };
    }
    case actions.SET_ADDRESSES_ERROR: {
      return {
        addresses: null,
        status: requestStatus.ERROR,
      };
    }
    case actions.SET_ADDRESSES: {
      return {
        addresses: action.payload,
        status: requestStatus.SUCCESS,
      };
    }
    case actions.ADD_ADDRESS: {
      return {
        ...state,
        addresses: state.addresses
          ? [...state.addresses, action.payload]
          : state.addresses,
      };
    }
    case actions.EDIT_ADDRESS: {
      const { editingId, ...newData } = action.payload;
      return {
        ...state,
        addresses:
          state.addresses?.map((address) =>
            (
              editingId
                ? address.id === editingId
                : address.id === action.payload.id
            )
              ? {
                  ...address,
                  ...newData,
                }
              : address
          ) || state.addresses,
      };
    }
    case actions.REMOVE_ADDRESS: {
      return {
        ...state,
        addresses:
          state.addresses?.filter((address) => address.id !== action.payload) ||
          state.addresses,
      };
    }
    default: {
      return state;
    }
  }
};

export default addressesReducer;

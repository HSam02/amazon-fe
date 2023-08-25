import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  createAddress,
  getAddresses,
  removeAddress,
  updateAddress,
} from "../../services/addresses.service";
import { IAddress } from "../../utils/types/interfaces";
import { requestStatus } from "../../utils/types/enums";
import * as actionCreators from "../actionCreators/addresses.actionCreators";
import * as actionTypes from "../actionTypes/addresses.actionTypes";

function* getAddressesAsync() {
  try {
    yield put(actionCreators.setAddressesPending());
    const addresses: IAddress[] = yield call(getAddresses);
    yield put(actionCreators.setAddresses(addresses));
  } catch (error) {
    console.error(error);
    yield put(actionCreators.setAddressesError());
  }
}

function* createAddressAsync({ payload }: actionTypes.ICreateAddressAction) {
  const tempId = Math.random();
  try {
    yield put(
      actionCreators.addAddress({
        id: tempId,
        value: payload,
        status: requestStatus.PENDING,
      })
    );
    const address: IAddress = yield call(createAddress, payload);
    yield put(
      actionCreators.editAddress({
        ...address,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editAddress({
        id: tempId,
        status: requestStatus.ERROR,
      } as IAddress)
    );
  }
}

function* updateAddressAsync({ payload }: actionTypes.IUpdateAddressAction) {
  try {
    yield put(
      actionCreators.editAddress({ ...payload, status: requestStatus.PENDING })
    );
    const isUpdated: boolean = yield call(updateAddress, payload);
    if (!isUpdated) {
      throw new Error("The Address didn't update");
    }
    yield put(
      actionCreators.editAddress({ ...payload, status: requestStatus.SUCCESS })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editAddress({ ...payload, status: requestStatus.ERROR })
    );
  }
}

function* deleteAddressAsync({ payload }: actionTypes.IDeleteAddressAction) {
  try {
    yield put(
      actionCreators.editAddress({
        id: payload,
        status: requestStatus.PENDING,
      } as IAddress)
    );
    const isDeleted: boolean = yield call(removeAddress, payload);
    if (!isDeleted) {
      throw new Error("The Address didn't delete");
    }
    yield put(actionCreators.removeAddress(payload));
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editAddress({
        id: payload,
        status: requestStatus.ERROR,
      } as IAddress)
    );
  }
}

function* watchAddresses() {
  yield takeEvery(actionTypes.GET_ADDRESSES, getAddressesAsync);
  yield takeEvery(actionTypes.CREATE_ADDRESS, createAddressAsync);
  yield takeEvery(actionTypes.UPDATE_ADDRESS, updateAddressAsync);
  yield takeEvery(actionTypes.DELETE_ADDRESS, deleteAddressAsync);
}

export default function* addressesSaga() {
  yield fork(watchAddresses);
}

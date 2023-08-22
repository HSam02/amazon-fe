import { call, fork, put, takeEvery } from "redux-saga/effects";
import { getUser, login, register } from "../../services/auth.service";
import { IUser } from "../../utils/types/interfaces";
import * as actionCreators from "../actionCreators/user.actionCreators";
import * as actionTypes from "../actionTypes/user.actionTypes";

function* getUserAsync() {
  try {
    yield put(actionCreators.setUserPending());
    const user: IUser = yield call(getUser);
    yield put(actionCreators.setUserData(user));
  } catch (error) {
    console.error(error);
    yield put(actionCreators.setUserData(null));
  }
}

function* loginUserAsync({ payload }: actionTypes.ILoginUserAction) {
  try {
    yield put(actionCreators.setUserPending());
    const user: IUser = yield call(login, payload);
    yield put(actionCreators.setUserData(user));
  } catch (error) {
    console.error(error);
    yield put(actionCreators.setUserError());
  }
}

function* registerUserAsync({ payload }: actionTypes.IRegisterUserAction) {
  try {
    yield put(actionCreators.setUserPending());
    const user: IUser = yield call(register, payload);
    yield put(actionCreators.setUserData(user));
  } catch (error: any) {
    console.error(error);
    yield put(actionCreators.setUserError());
  }
}

function* watchUser() {
  yield takeEvery(actionTypes.GET_USER, getUserAsync);
  yield takeEvery(actionTypes.LOGIN_USER, loginUserAsync);
  yield takeEvery(actionTypes.REGISTER_USER, registerUserAsync);
}

export default function* userSaga() {
  yield fork(watchUser);
}

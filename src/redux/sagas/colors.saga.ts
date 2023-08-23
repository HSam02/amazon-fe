import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  createColor,
  getColors,
  removeColor,
  updateColor,
} from "../../services/colors.service";
import { IColor } from "../../utils/types/interfaces";
import { requestStatus } from "../../utils/types/enums";
import * as actionCreators from "../actionCreators/colors.actionCreators";
import * as actionTypes from "../actionTypes/colors.actionTypes";

function* getColorsAsync() {
  try {
    yield put(actionCreators.setColorsPending());
    const colors: IColor[] = yield call(getColors);
    yield put(actionCreators.setColors(colors));
  } catch (error) {
    console.error(error);
    yield put(actionCreators.setColorsError());
  }
}

function* createColorAsync({ payload }: actionTypes.ICreateColorAction) {
  const tempId = Math.random();
  try {
    yield put(
      actionCreators.addColor({
        id: tempId,
        value: payload,
        status: requestStatus.PENDING,
      })
    );
    const color: IColor = yield call(createColor, payload);
    yield put(
      actionCreators.editColor({
        ...color,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editColor({
        id: tempId,
        status: requestStatus.ERROR,
      } as IColor)
    );
  }
}

function* updateColorAsync({ payload }: actionTypes.IUpdateColorAction) {
  try {
    yield put(
      actionCreators.editColor({ ...payload, status: requestStatus.PENDING })
    );
    const isUpdated: boolean = yield call(updateColor, payload);
    if (!isUpdated) {
      throw new Error("The Color didn't update");
    }
    yield put(
      actionCreators.editColor({ ...payload, status: requestStatus.SUCCESS })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editColor({ ...payload, status: requestStatus.ERROR })
    );
  }
}

function* deleteColorAsync({ payload }: actionTypes.IDeleteColorAction) {
  try {
    yield put(
      actionCreators.editColor({
        id: payload,
        status: requestStatus.PENDING,
      } as IColor)
    );
    const isDeleted: boolean = yield call(removeColor, payload);
    if (!isDeleted) {
      throw new Error("The Color didn't delete");
    }
    yield put(actionCreators.removeColor(payload));
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editColor({
        id: payload,
        status: requestStatus.ERROR,
      } as IColor)
    );
  }
}

function* watchColors() {
  yield takeEvery(actionTypes.GET_COLORS, getColorsAsync);
  yield takeEvery(actionTypes.CREATE_COLOR, createColorAsync);
  yield takeEvery(actionTypes.UPDATE_COLOR, updateColorAsync);
  yield takeEvery(actionTypes.DELETE_COLOR, deleteColorAsync);
}

export default function* colorsSaga() {
  yield fork(watchColors);
}

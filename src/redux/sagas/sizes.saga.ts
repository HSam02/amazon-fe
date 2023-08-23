import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  createSize,
  getSizes,
  removeSize,
  updateSize,
} from "../../services/sizes.service";
import { ISize } from "../../utils/types/interfaces";
import { requestStatus } from "../../utils/types/enums";
import * as actionCreators from "../actionCreators/sizes.actionCreators";
import * as actionTypes from "../actionTypes/sizes.actionTypes";

function* getSizsAsync() {
  try {
    yield put(actionCreators.setSizesPending());
    const sizes: ISize[] = yield call(getSizes);
    yield put(actionCreators.setSizes(sizes));
  } catch (error) {
    console.error(error);
    yield put(actionCreators.setSizesError());
  }
}

function* createSizeAsync({ payload }: actionTypes.ICreateSizeAction) {
  const tempId = Math.random();
  try {
    yield put(
      actionCreators.addSize({
        id: tempId,
        value: payload,
        status: requestStatus.PENDING,
      })
    );
    const size: ISize = yield call(createSize, payload);
    yield put(
      actionCreators.editSize({
        ...size,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editSize({
        id: tempId,
        status: requestStatus.ERROR,
      } as ISize)
    );
  }
}

function* updateSizeAsync({ payload }: actionTypes.IUpdateSizeAction) {
  try {
    yield put(
      actionCreators.editSize({ ...payload, status: requestStatus.PENDING })
    );
    const isUpdated: boolean = yield call(updateSize, payload);
    if (!isUpdated) {
      throw new Error("The Size didn't update");
    }
    yield put(
      actionCreators.editSize({ ...payload, status: requestStatus.SUCCESS })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editSize({ ...payload, status: requestStatus.ERROR })
    );
  }
}

function* deleteSizeAsync({ payload }: actionTypes.IDeleteSizeAction) {
  try {
    yield put(
      actionCreators.editSize({
        id: payload,
        status: requestStatus.PENDING,
      } as ISize)
    );
    const isDeleted: boolean = yield call(removeSize, payload);
    if (!isDeleted) {
      throw new Error("The Size didn't delete");
    }
    yield put(actionCreators.removeSize(payload));
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editSize({
        id: payload,
        status: requestStatus.ERROR,
      } as ISize)
    );
  }
}

function* watchSizes() {
  yield takeEvery(actionTypes.GET_SIZES, getSizsAsync);
  yield takeEvery(actionTypes.CREATE_SIZE, createSizeAsync);
  yield takeEvery(actionTypes.UPDATE_SIZE, updateSizeAsync);
  yield takeEvery(actionTypes.DELETE_SIZE, deleteSizeAsync);
}

export default function* sizesSaga() {
  yield fork(watchSizes);
}

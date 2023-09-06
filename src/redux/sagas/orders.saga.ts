import { call, fork, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes/orders.actionTypes";
import * as actionCreators from "../actionCreators/orders.actionCreators";
import { IGetOrdersResponse } from "../../utils/Orders/interfaces";
import { getOrders } from "../../services/orders.service";

function* getOrdersAsync({ payload }: actionTypes.IGetOrdersAction) {
  try {
    if (!payload) {
      yield put(actionCreators.clearOrdersSlice());
    }
    yield put(actionCreators.setOrdersPending());
    const data: IGetOrdersResponse = yield call(getOrders, payload);
    yield put(actionCreators.setOrders(data));
  } catch (error) {
    yield put(actionCreators.setOrdersError());
  }
}

function* watchOrders() {
  yield takeLeading(actionTypes.GET_ORDERS, getOrdersAsync);
}

export default function* ordersSaga() {
  yield fork(watchOrders);
}

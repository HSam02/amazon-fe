import * as actionTypes from "../actionTypes/buyLater.actionTypes";
import * as actionCreators from "../actionCreators/buyLater.actionCreators";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  createBuyLaterItem,
  deleteBuyLaterItem,
  getBuyLater,
} from "../../services/buylater.service";
import { IBuyLaterItem } from "../../utils/types/interfaces";
import { requestStatus } from "../../utils/types/enums";
import store from "../store";
import localStorageKeys from "../../utils/types/localStorageKeys";

function* getBuyLaterAsync() {
  const user = store.getState().user.user;
  if (user) {
    try {
      yield Promise.all(
        (
          JSON.parse(
            localStorage.getItem(localStorageKeys.BUY_LATER_KEY) || "[]"
          ) as IBuyLaterItem[]
        ).map(
          ({ color, product, size }) =>
            user.id !== product.user.id &&
            createBuyLaterItem({
              colorId: color.id,
              productId: product.id,
              sizeId: size.id,
            })
        )
      );
    } catch (error) {
    } finally {
      localStorage.removeItem(localStorageKeys.BUY_LATER_KEY);
    }
  }
  try {
    yield put(actionCreators.setBuyLaterPending());
    const data: IBuyLaterItem[] = user
      ? yield call(getBuyLater)
      : JSON.parse(
          localStorage.getItem(localStorageKeys.BUY_LATER_KEY) || "[]"
        );
    yield put(actionCreators.setBuyLater(data));
  } catch (error) {
    yield put(actionCreators.setBuyLaterError());
  }
}

function* createBuyLaterItemAsync({
  payload,
}: actionTypes.ICreateBuyLaterItemAction) {
  const tempId = Math.random();
  const { color, product, size } = payload;
  const isAuthorized = store.getState().user.user;
  try {
    yield put(
      actionCreators.addBuyLaterItem({
        ...payload,
        id: tempId,
        status: requestStatus.PENDING,
      })
    );
    if (!isAuthorized) {
      const localItems: IBuyLaterItem[] = JSON.parse(
        localStorage.getItem(localStorageKeys.BUY_LATER_KEY) || "[]"
      );
      if (
        localItems.some(
          (item) =>
            item.color.id === color.id &&
            item.product.id === product.id &&
            item.size.id === size.id
        )
      ) {
        throw new Error("");
      }
      localItems.unshift({
        ...payload,
        id: tempId,
        status: requestStatus.SUCCESS,
      });
      localStorage.setItem(
        localStorageKeys.BUY_LATER_KEY,
        JSON.stringify(localItems)
      );
    }
    const buyLaterItem: IBuyLaterItem = isAuthorized
      ? yield call(createBuyLaterItem, {
          productId: product.id,
          colorId: color.id,
          sizeId: size.id,
        })
      : {
          ...payload,
          id: tempId,
          status: requestStatus.SUCCESS,
        };
    yield put(
      actionCreators.editBuyLaterItem({
        ...buyLaterItem,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    alert("The Item not added");
    yield put(actionCreators.removeBuyLaterItem(tempId));
  }
}

function* deleteBuyLaterItemAsync({
  payload,
}: actionTypes.IDeleteBuyLaterItemAction) {
  const isAuthorized = store.getState().user.user;
  try {
    yield put(actionCreators.setBuyLaterPending());
    if (!isAuthorized) {
      const localItems: IBuyLaterItem[] = JSON.parse(
        localStorage.getItem(localStorageKeys.BUY_LATER_KEY) || "[]"
      );
      localStorage.setItem(
        localStorageKeys.BUY_LATER_KEY,
        JSON.stringify(localItems.filter(({ id }) => id !== payload))
      );
    }
    const isDeleted: boolean = isAuthorized
      ? yield call(deleteBuyLaterItem, payload)
      : true;
    if (!isDeleted) {
      throw new Error("The Item not deleted");
    }
    yield put(actionCreators.removeBuyLaterItem(payload));
  } catch (error) {
    alert("The Item not deleted");
  } finally {
    yield put(actionCreators.setBuyLater());
  }
}

function* watchBuyLater() {
  yield takeEvery(actionTypes.GET_BUYLATER, getBuyLaterAsync);
  yield takeEvery(actionTypes.CREATE_BUYLATER_ITEM, createBuyLaterItemAsync);
  yield takeEvery(actionTypes.DELETE_BUYLATER_ITEM, deleteBuyLaterItemAsync);
}

export default function* buyLaterSaga() {
  yield fork(watchBuyLater);
}

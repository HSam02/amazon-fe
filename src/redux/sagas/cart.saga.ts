import * as actionTypes from "../actionTypes/cart.actionTypes";
import * as actionCreators from "../actionCreators/cart.actionCreators";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import { ICartItem } from "../../utils/types/interfaces";
import {
  createCartItem,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../../services/cart.service";
import { requestStatus } from "../../utils/types/enums";
import { ICartUpdateResponse } from "../../utils/Cart/interfaces";
import store from "../store";
import localStorageKeys from "../../utils/types/localStorageKeys";

function* getCartAsync() {
  const isAuthorized = store.getState().user.user;
  if (isAuthorized) {
    try {
      yield Promise.all(
        (
          JSON.parse(
            localStorage.getItem(localStorageKeys.CART_KEY) || "[]"
          ) as ICartItem[]
        ).map(({ color, product, quantity, size }) =>
          createCartItem({
            colorId: color.id,
            productId: product.id,
            quantity,
            sizeId: size.id,
          })
        )
      );
    } finally {
      localStorage.removeItem(localStorageKeys.CART_KEY);
    }
  }
  try {
    yield put(actionCreators.setCartPending());
    const data: ICartItem[] = isAuthorized
      ? yield call(getCart)
      : JSON.parse(localStorage.getItem(localStorageKeys.CART_KEY) || "[]");
    yield put(actionCreators.setCart(data));
  } catch (error) {
    yield put(actionCreators.setCartError());
  }
}

function* createCartItemAsync({ payload }: actionTypes.ICreateCartItemAction) {
  const tempId = Math.random();
  const { color, product, quantity, size } = payload;
  const isAuthorized = store.getState().user.user;
  try {
    yield put(
      actionCreators.addCartItem({
        ...payload,
        id: tempId,
        status: requestStatus.PENDING,
      })
    );
    if (!isAuthorized) {
      const localItems: ICartItem[] = JSON.parse(
        localStorage.getItem(localStorageKeys.CART_KEY) || "[]"
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
        localStorageKeys.CART_KEY,
        JSON.stringify(localItems)
      );
    }
    const cartItem: ICartItem = isAuthorized
      ? yield call(createCartItem, {
          quantity,
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
      actionCreators.editCartItem({
        ...cartItem,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    alert("The Cart Item not added");
    yield put(actionCreators.removeCartItem(tempId));
  }
}

function* updateCartItemAsync({ payload }: actionTypes.IUpdateCartItemAction) {
  const { id, quantity } = payload;
  const isAuthorized = store.getState().user.user;
  try {
    if (!id || !quantity) {
      throw new Error("");
    }
    yield put(actionCreators.setCartPending());
    // yield put(
    //   actionCreators.editCartItem({
    //     id,
    //     status: requestStatus.PENDING,
    //   })
    // );
    if (!isAuthorized) {
      const localItems: ICartItem[] = JSON.parse(
        localStorage.getItem(localStorageKeys.CART_KEY) || "[]"
      );
      localStorage.setItem(
        localStorageKeys.CART_KEY,
        JSON.stringify(
          localItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        )
      );
    }
    const { cartItem, success }: ICartUpdateResponse = isAuthorized
      ? yield call(updateCartItem, id, { quantity })
      : { cartItem: { id, quantity }, success: true };
    if (!success || !cartItem) {
      throw new Error("The Cart Item not updated");
    }
    yield put(
      actionCreators.editCartItem({
        ...cartItem,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    yield put(
      actionCreators.editCartItem({
        id,
        status: requestStatus.ERROR,
      })
    );
  } finally {
    yield put(actionCreators.setCart());
  }
}

function* deleteCartItemAsync({ payload }: actionTypes.IDeleteCartItemAction) {
  const isAuthorized = store.getState().user.user;
  try {
    yield put(actionCreators.setCartPending());
    if (!isAuthorized) {
      const localItems: ICartItem[] = JSON.parse(
        localStorage.getItem(localStorageKeys.CART_KEY) || "[]"
      );
      localStorage.setItem(
        localStorageKeys.CART_KEY,
        JSON.stringify(localItems.filter(({ id }) => id !== payload))
      );
    }
    const isDeleted: boolean = isAuthorized
      ? yield call(deleteCartItem, payload)
      : true;
    if (!isDeleted) {
      throw new Error("The Cart Item not deleted");
    }
    yield put(actionCreators.removeCartItem(payload));
  } catch (error) {
    alert("The Cart Item not deleted");
  } finally {
    yield put(actionCreators.setCart());
  }
}

function* watchCart() {
  yield takeEvery(actionTypes.GET_CART, getCartAsync);
  yield takeEvery(actionTypes.CREATE_CART_ITEM, createCartItemAsync);
  yield takeEvery(actionTypes.UPDATE_CART_ITEM, updateCartItemAsync);
  yield takeEvery(actionTypes.DELETE_CART_ITEM, deleteCartItemAsync);
}

export default function* cartSaga() {
  yield fork(watchCart);
}

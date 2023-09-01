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

function* getCartAsync() {
  try {
    yield put(actionCreators.setCartPending());
    const data: ICartItem[] = yield call(getCart);
    yield put(actionCreators.setCart(data));
  } catch (error) {
    yield put(actionCreators.setCartError());
  }
}

function* createCartItemAsync({ payload }: actionTypes.ICreateCartItemAction) {
  const tempId = Math.random();
  const { color, product, quantity, size } = payload;
  try {
    yield put(
      actionCreators.addCartItem({
        ...payload,
        id: tempId,
        status: requestStatus.PENDING,
      })
    );
    const cartItem: ICartItem = yield call(createCartItem, {
      quantity,
      productId: product.id,
      colorId: color.id,
      sizeId: size.id,
    });
    yield put(
      actionCreators.editCartItem({
        ...cartItem,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    alert("The Cart Item not added");
    yield put(
      actionCreators.editCartItem({
        id: tempId,
        status: requestStatus.ERROR,
      })
    );
  }
}

function* updateCartItemAsync({ payload }: actionTypes.IUpdateCartItemAction) {
  const { id, color, quantity, size } = payload;
  try {
    yield put(
      actionCreators.editCartItem({
        id,
        status: requestStatus.PENDING,
      })
    );
    const { cartItem, success }: ICartUpdateResponse = yield call(
      updateCartItem,
      id,
      {
        colorId: color.id,
        sizeId: size.id,
        quantity,
      }
    );
    if (!success || !cartItem) {
      throw new Error("The Cart Item not updated");
    }
    yield put(
      actionCreators.editCartItem({
        ...cartItem,
        status: requestStatus.ERROR,
      })
    );
  } catch (error) {
    yield put(
      actionCreators.editCartItem({
        id,
        status: requestStatus.ERROR,
      })
    );
  }
}

function* deleteCartItemAsync({ payload }: actionTypes.IDeleteCartItemAction) {
  try {
    yield put(
      actionCreators.editCartItem({
        id: payload,
        status: requestStatus.PENDING,
      })
    );
    const isDeleted: boolean = yield call(deleteCartItem, payload);
    if (!isDeleted) {
      throw new Error("The Cart Item not deleted");
    }
    yield put(actionCreators.removeCartItem(payload));
  } catch (error) {
    yield put(
      actionCreators.editCartItem({
        id: payload,
        status: requestStatus.ERROR,
      })
    );
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

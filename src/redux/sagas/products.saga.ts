import { call, fork, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes/products.actionTypes";
import * as actionCreators from "../actionCreators/products.actionCreators";
import { IProduct } from "../../utils/types/interfaces";
import { createProduct } from "../../services/product.service";

function* getUserProductsAsync() {
  try {
    yield put(actionCreators.setProductsPending());
    const products: IProduct[] = yield call(actionCreators.getUserProducts);
    yield put(actionCreators.setProducts(products));
  } catch (error) {
    yield put(actionCreators.setProductsError());
  }
}

// function* createProductAsync({ payload }: actionTypes.ICreateProductAction) {
//   const tempId = Math.random();
//   try {
//     yield put(actionCreators.addProduct({
//       id: tempId,
//       status: 
//     }));
//     const product: IProduct = yield call(createProduct, payload);
//     yield put(actionCreators.addProduct(product));
//   } catch (error) {

//   }
// }

function* watchProducts() {
  yield takeEvery(actionTypes.GET_USER_PRODUCTS, getUserProductsAsync);
}

export default function* productsSaga() {
  yield fork(watchProducts);
}

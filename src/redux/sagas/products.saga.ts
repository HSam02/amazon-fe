import { call, fork, put, takeEvery } from "redux-saga/effects";
import { IProduct } from "../../utils/types/interfaces";
import {
  IGetProductsResponse,
  IProductUpdateResponse,
} from "../../utils/Products/interfaces";
import { requestStatus } from "../../utils/types/enums";
import {
  createProduct,
  deleteProduct,
  getUserProducts,
  updateProduct,
} from "../../services/product.service";
import * as actionTypes from "../actionTypes/products.actionTypes";
import * as actionCreators from "../actionCreators/products.actionCreators";

function* getUserProductsAsync({
  payload,
}: actionTypes.IGetUserProductsAction) {
  try {
    yield put(actionCreators.setProductsPending());
    const data: IGetProductsResponse = yield call(getUserProducts, payload);
    yield put(actionCreators.setProducts(data));
  } catch (error) {
    yield put(actionCreators.setProductsError());
  }
}

function* createProductAsync({ payload }: actionTypes.ICreateProductAction) {
  const { name, description, category, price } = JSON.parse(
    payload.get("data") as string
  ) as IProduct;
  const tempId = Math.random();

  try {
    yield put(
      actionCreators.addProduct({
        id: tempId,
        name,
        description,
        category,
        price,
        status: requestStatus.PENDING,
      } as IProduct)
    );
    const product: IProduct = yield call(createProduct, payload);
    yield put(
      actionCreators.editProduct({
        ...product,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    alert("The Product not added");
    yield put(
      actionCreators.editProduct({
        id: tempId,
        status: requestStatus.ERROR,
      })
    );
  }
}

function* updateProductAsync({ payload }: actionTypes.IUpdateProductAction) {
  const { id, formData } = payload;
  try {
    yield put(
      actionCreators.editProduct({
        id,
        status: requestStatus.PENDING,
      })
    );
    const { success, product }: IProductUpdateResponse = yield call(
      updateProduct,
      id,
      formData
    );
    if (!success || !product) {
      throw new Error("The Product not updated");
    }
    yield put(
      actionCreators.editProduct({ ...product, status: requestStatus.SUCCESS })
    );
  } catch (error) {
    yield put(actionCreators.editProduct({ id, status: requestStatus.ERROR }));
  }
}

function* deleteProductAsync({ payload }: actionTypes.IDeleteProductAction) {
  try {
    yield put(
      actionCreators.editProduct({
        id: payload,
        status: requestStatus.PENDING,
      })
    );
    const isDeleted: boolean = yield call(deleteProduct, payload);
    if (!isDeleted) {
      throw new Error("The Product not deleted");
    }
    yield put(actionCreators.removeProduct(payload));
  } catch (error) {
    yield put(
      actionCreators.editProduct({
        id: payload,
        status: requestStatus.ERROR,
      })
    );
  }
}

function* watchProducts() {
  yield takeEvery(actionTypes.GET_USER_PRODUCTS, getUserProductsAsync);
  yield takeEvery(actionTypes.CREATE_PRODUCT, createProductAsync);
  yield takeEvery(actionTypes.UPDATE_PRODUCT, updateProductAsync);
  yield takeEvery(actionTypes.DELETE_PRODUCT, deleteProductAsync);
}

export default function* productsSaga() {
  yield fork(watchProducts);
}

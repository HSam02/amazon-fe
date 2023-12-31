import {
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import { IProduct } from "../../utils/types/interfaces";
import {
  IGetProductsResponse,
  IProductUpdateResponse,
} from "../../utils/Products/interfaces";
import { requestStatus } from "../../utils/types/enums";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  updateProduct,
} from "../../services/product.service";
import store from "../store";
import * as actionTypes from "../actionTypes/products.actionTypes";
import * as actionCreators from "../actionCreators/products.actionCreators";

function* getUserProductsAsync({
  payload,
}: actionTypes.IGetUserProductsAction) {
  try {
    if (!payload) {
      yield put(actionCreators.clearProductsSlice());
    }
    yield put(actionCreators.setProductsPending());
    const data: IGetProductsResponse = yield call(getUserProducts, payload);
    yield put(actionCreators.setProducts(data));
  } catch (error) {
    yield put(actionCreators.setProductsError());
  }
}

function* getAllProductsAsync({ payload }: actionTypes.IGetAllProductsAction) {
  const { filters, pagination } = payload;
  try {
    if (!pagination) {
      yield put(actionCreators.clearProductsSlice());
    }
    yield put(actionCreators.setProductsPending());
    const data: IGetProductsResponse = yield call(
      getAllProducts,
      pagination,
      filters
    );
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
    // const { firstName, lastName, id } = store.getState().user.user!;
    // yield put(
    //   actionCreators.addProduct({
    //     id: tempId,
    //     name,
    //     description,
    //     category,
    //     price,
    //     user: { id, firstName, lastName },
    //     status: requestStatus.PENDING,
    //   } as IProduct)
    // );
    const reload =
      store.getState().products.products &&
      store.getState().products.products![0].user.id ===
        store.getState().user.user?.id;
    if (reload) {
      yield put(actionCreators.setProductsPending());
    }
    const product: IProduct = yield call(createProduct, payload);
    // yield put(
    //   actionCreators.editProduct({
    //     ...product,
    //     editingId: tempId,
    //     status: requestStatus.SUCCESS,
    //   })
    // );.

    if (reload) {
      yield put(actionCreators.clearProductsSlice());
      yield put(actionCreators.getUserProducts());
    }
  } catch (error) {
    alert("The Product not added");
    yield put(actionCreators.setProductsSuccess());
    // yield put(
    //   actionCreators.editProduct({
    //     id: tempId,
    //     status: requestStatus.ERROR,
    //   })
    // );
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
    // yield put(
    //   actionCreators.editProduct({
    //     id: payload,
    //     status: requestStatus.PENDING,
    //   })
    // );
    yield put(actionCreators.setProductsPending());
    const isDeleted: boolean = yield call(deleteProduct, payload);
    if (!isDeleted) {
      throw new Error("The Product not deleted");
    }
    yield put(actionCreators.clearProductsSlice());
    yield put(actionCreators.getUserProducts());
  } catch (error) {
    yield put(actionCreators.setProductsSuccess());
    // yield put(
    //   actionCreators.editProduct({
    //     id: payload,
    //     status: requestStatus.ERROR,
    //   })
    // );
  }
}

function* watchProducts() {
  yield takeLeading(actionTypes.GET_USER_PRODUCTS, getUserProductsAsync);
  yield takeLatest(actionTypes.GET_ALL_PRODUCTS, getAllProductsAsync);
  yield takeEvery(actionTypes.CREATE_PRODUCT, createProductAsync);
  yield takeEvery(actionTypes.UPDATE_PRODUCT, updateProductAsync);
  yield takeEvery(actionTypes.DELETE_PRODUCT, deleteProductAsync);
}

export default function* productsSaga() {
  yield fork(watchProducts);
}

import {
  IGetProductsResponse,
  ProductFilterType,
} from "../../utils/Products/interfaces";
import { IPagination, IProduct } from "../../utils/types/interfaces";
import * as actions from "../actionTypes/products.actionTypes";

export const getUserProducts = (
  pagination?: IPagination
): actions.IGetUserProductsAction => ({
  type: actions.GET_USER_PRODUCTS,
  payload: pagination,
});

export const getAllProducts = (
  pagination?: IPagination,
  filters?: ProductFilterType
): actions.IGetAllProductsAction => ({
  type: actions.GET_ALL_PRODUCTS,
  payload: { pagination, filters },
});

export const createProduct = (
  formData: FormData
): actions.ICreateProductAction => ({
  type: actions.CREATE_PRODUCT,
  payload: formData,
});

export const updateProduct = (
  id: number,
  formData: FormData
): actions.IUpdateProductAction => ({
  type: actions.UPDATE_PRODUCT,
  payload: { formData, id },
});

export const deleteProduct = (id: number): actions.IDeleteProductAction => ({
  type: actions.DELETE_PRODUCT,
  payload: id,
});

export const setProducts = (
  response: IGetProductsResponse
): actions.ISetProductsAction => ({
  type: actions.SET_PRODUCTS,
  payload: response,
});

export const addProduct = (product: IProduct): actions.IAddProductAction => ({
  type: actions.ADD_PRODUCT,
  payload: product,
});

export const editProduct = (
  product: Partial<IProduct> & { editingId?: number }
): actions.IEditProductAction => ({
  type: actions.EDIT_PRODUCT,
  payload: product,
});

export const removeProduct = (id: number): actions.IRemoveProductAction => ({
  type: actions.REMOVE_PRODUCT,
  payload: id,
});

export const setProductsSuccess = (): actions.ISetProductsSuccessAction => ({
  type: actions.SET_PRODUCTS_SUCCESS,
});

export const setProductsPending = (): actions.ISetProductsPendingAction => ({
  type: actions.SET_PRODUCTS_PENDING,
});

export const setProductsError = (): actions.ISetProductsErrorAction => ({
  type: actions.SET_PRODUCTS_ERROR,
});

export const clearProductsSlice = (): actions.IClearProductsSliceAction => ({
  type: actions.CLEAR_PRODUCTS_SLICE,
});

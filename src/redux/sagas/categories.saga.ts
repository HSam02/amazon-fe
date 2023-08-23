import { takeEvery, fork, put, call } from "redux-saga/effects";
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from "../../services/categories.service";
import { ICategory } from "../../utils/types/interfaces";
import { requestStatus } from "../../utils/types/enums";
import {
  IActionCategory,
  ICategoryResponse,
} from "../../utils/Admin/interfaces";
import * as actionCreators from "../actionCreators/categories.actionCreators";
import * as actionTypes from "../actionTypes/categories.actionTypes";

function* getCategoriesAsync() {
  try {
    yield put(actionCreators.setCategoriesPending());
    const categories: ICategory[] = yield getCategories();
    yield put(
      actionCreators.setCategories(
        categories.map((category) => ({
          ...category,
          status: requestStatus.SUCCESS,
        }))
      )
    );
  } catch (error) {
    console.error(error);
    yield put(actionCreators.setCategoriesError());
  }
}

function* createCategoryAsync({ payload }: actionTypes.ICreateCategoryAction) {
  const tempId = Math.random();
  try {
    yield put(
      actionCreators.addCategory({
        ...payload,
        id: tempId,
        status: requestStatus.PENDING,
      } as IActionCategory)
    );
    const category: ICategoryResponse = yield call(createCategory, payload);
    yield put(
      actionCreators.editCategory({
        ...category,
        editingId: tempId,
        status: requestStatus.SUCCESS,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editCategory({
        ...payload,
        editingId: tempId,
        status: requestStatus.ERROR,
      } as IActionCategory)
    );
  }
}

function* updateCategoryAsync({ payload }: actionTypes.IUpdateCategoryAction) {
  try {
    yield put(
      actionCreators.editCategory({ ...payload, status: requestStatus.PENDING })
    );
    const isUpdated: boolean = yield call(updateCategory, payload);
    if (!isUpdated) {
      throw new Error("The Category didn't update");
    }
    yield put(
      actionCreators.editCategory({ ...payload, status: requestStatus.SUCCESS })
    );
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editCategory({ ...payload, status: requestStatus.ERROR })
    );
  }
}

function* deleteCategoryAsync({ payload }: actionTypes.IDeleteCategoryAction) {
  try {
    yield put(
      actionCreators.editCategory({
        id: payload,
        status: requestStatus.PENDING,
      })
    );
    const isDeleted: boolean = yield call(removeCategory, payload);
    if (!isDeleted) {
      throw new Error("The Category didn't delete");
    }
    yield put(actionCreators.removeCategory(payload));
  } catch (error) {
    console.error(error);
    yield put(
      actionCreators.editCategory({
        id: payload,
        status: requestStatus.ERROR,
      })
    );
  }
}

function* watchCategories() {
  yield takeEvery(actionTypes.GET_CATEGORIES, getCategoriesAsync);
  yield takeEvery(actionTypes.CREATE_CATEGORY, createCategoryAsync);
  yield takeEvery(actionTypes.UPDATE_CATEGORY, updateCategoryAsync);
  yield takeEvery(actionTypes.DELETE_CATEGORY, deleteCategoryAsync);
}

export default function* categoriesSaga() {
  yield fork(watchCategories);
}

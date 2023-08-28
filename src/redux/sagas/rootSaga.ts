import { all, fork } from "redux-saga/effects";
import UserSaga from "./user.saga";
import CategoriesSaga from "./categories.saga";
import SizesSaga from "./sizes.saga";
import ColorsSaga from "./colors.saga";
import AddressesSaga from "./addresses.saga";
import ProductsSaga from "./products.saga";

export default function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(CategoriesSaga),
    fork(SizesSaga),
    fork(ColorsSaga),
    fork(AddressesSaga),
    fork(ProductsSaga),
  ]);
}

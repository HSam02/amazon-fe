import { all, fork } from "redux-saga/effects";
import UserSaga from "./user.saga";
import CategoriesSaga from "./categories.saga";

export default function* rootSaga() {
  yield all([fork(UserSaga), fork(CategoriesSaga)]);
}

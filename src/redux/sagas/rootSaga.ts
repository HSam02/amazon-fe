import { all, fork } from "redux-saga/effects";
import UserSaga from "./user.saga";
import CategoriesSaga from "./categories.saga";
import SizesSaga from "./sizes.saga";
import ColorsSaga from "./colors.saga";
import AddressesSaga from "./addresses.saga";
import ProductsSaga from "./products.saga";
import CartSaga from "./cart.saga";
import BuyLaterSaga from "./buyLater.saga";
import OrdersSaga from "./orders.saga";

export default function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(CategoriesSaga),
    fork(SizesSaga),
    fork(ColorsSaga),
    fork(AddressesSaga),
    fork(ProductsSaga),
    fork(CartSaga),
    fork(BuyLaterSaga),
    fork(OrdersSaga),
  ]);
}

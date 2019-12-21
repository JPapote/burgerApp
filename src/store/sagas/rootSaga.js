import {takeEvery, all} from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeoutSaga, authSagaUser, authCheckStateSaga } from './auth';
import * as actionType from '../actions/actionsTypes';
import {burgerBuilderSagas} from './burgerBuilderSagas';
import {purchaseBurgerSaga} from './orderSaga';
export function* watchAuth(){
    yield all([
     takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
     takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
     takeEvery(actionType.AUTH_USER,  authSagaUser),
     takeEvery(actionType.AUTH_CHECK_INITIAL_STATE,authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionType.INIT_INGREDIENT_SAGA, burgerBuilderSagas)
}

export function* watchPurchaseBurger(){
    yield takeEvery(actionType.PURCHARSE_BURGER_SAGA, purchaseBurgerSaga);
}
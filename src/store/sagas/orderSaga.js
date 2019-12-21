import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-ordens';
export function* purchaseBurgerSaga (action) {
    yield put(actions.purchaseBurgerStart());
    try{
        const response = yield axios.post('orders.json?auth='+ action.token, action.orderData)
            yield put(actions.purchaseBurgerSucces(response.data.name, action.orderData));

    }catch(error){
           yield put(actions.purchaseBurgerFail(error));
      }
}
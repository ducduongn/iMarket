import axios from 'axios';
import { put, call, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { processFetchResponse } from './cart.manager';
import { SET_IS_ERROR, SET_FETCHING, FETCH_CART_DATA, FETCH_FAIL, FETCH_SUCCESS } from './cart.types';

function* wsaga_fetchCart() {
    try {
        yield put({ type: SET_FETCHING, payload: true });
        const response = yield call(axios.get, '/data/shop_order.json');
        const data = response.data;
        yield put({ type: FETCH_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: FETCH_FAIL });
        console.log(err.message);
    }
}

function* watchFetchCartData() {
    yield takeLatest(FETCH_CART_DATA, wsaga_fetchCart);
}

export default function* rootCartSaga() {
    yield all([watchFetchCartData()]);
}

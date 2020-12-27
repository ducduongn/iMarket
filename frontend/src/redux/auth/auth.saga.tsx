import axios from 'axios';
import { put, call, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { LoginRequest, LoginResponse, LoginResponseError, SignupResponse, UserResponse } from './auth.d';
import {
    FETCH_FAIL,
    FETCH_SUCCESS,
    FETCH_USER,
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADING,
} from './auth.types';
import Cookies from 'js-cookie';

const API_VER = '/api/v1';
const APP = 'account';

function resolve(path: string): string {
    return `${API_VER}/${APP}/${path}`;
}

function* saga_fetchUser() {
    try {
        yield put({ type: USER_LOADING });
        const token = Cookies.get('auth_token');
        if (token == undefined) {
            yield put({ type: FETCH_FAIL });
            return;
        }
        const response = yield call(axios.get, resolve('user'), {
            headers: { Authorization: 'Token '.concat(token) },
        });
        const data: UserResponse = response.data;
        yield put({ type: FETCH_SUCCESS, payload: data });
    } catch (err) {
        yield put({ type: FETCH_FAIL });
        console.log(err.message);
    }
}

function* saga_logoutUser(action: { type: string; payload: string }) {
    try {
        yield put({ type: USER_LOADING });
        const response = yield call(
            axios.post,
            resolve('logout'),
            {},
            {
                headers: { Authorization: 'Token '.concat(action.payload) },
            },
        );
        const data: LoginResponse = response.data;
        yield put({ type: LOGOUT_SUCCESS, payload: data });
    } catch (err) {
        console.log('errrrr', err);
        yield put({ type: LOGOUT_FAIL, payload: err.response.data });
    }
}

function* saga_signupUser(action: { type: string; payload: LoginRequest }) {
    try {
        yield put({ type: USER_LOADING });
        const response = yield call(axios.post, resolve('signup'), { ...action.payload });
        const data: SignupResponse = response.data;
        yield put({ type: REGISTER_SUCCESS, payload: data });
    } catch (err) {
        console.log('signup errrrrrrrrrrrrrrrrrrrrrrror', err);
        yield put({ type: REGISTER_FAIL, payload: err.response.data });
    }
}

function* saga_loginUser(action: { type: string; payload: LoginRequest }) {
    try {
        yield put({ type: USER_LOADING });
        const response = yield call(axios.post, resolve('login'), { ...action.payload });
        const data: LoginResponse = response.data;
        yield put({ type: LOGIN_SUCCESS, payload: data });
    } catch (err) {
        console.log('errrrr', err);
        yield put({ type: LOGIN_FAIL, payload: err.response.data });
    }
}

function* watchFetchUser() {
    yield takeLatest(FETCH_USER, saga_fetchUser);
}

function* watchLoginUser() {
    yield takeLatest(LOGIN, saga_loginUser);
}

function* watchLogoutUser() {
    yield takeLatest(LOGOUT, saga_logoutUser);
}

function* watchSignupUser() {
    yield takeLatest(REGISTER, saga_signupUser);
}

export default function* rootAuthSaga() {
    yield all([watchFetchUser(), watchLoginUser(), watchLogoutUser(), watchSignupUser()]);
}

/*
    ACTION
*/
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER,
    REGISTER_FAIL,
    AUTH_ERROR_HANDLE,
} from './auth.types';

import axios from 'axios';
import Cookies from 'js-cookie';
import { api_signUp, api_login, api_logout, api_getUser } from '../../protocol/Authentification';

const api_url = '/api';
axios.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken');

/**
 *
 * @param {Object} user firstName, lastName, email, password
 * @param {requestCallback} errorHandler
 */
export const signUp = (dispatch) => (user, onApiError) => {
    console.log(user);
    if (user.firstName && user.lastName && user.email && user.password) {
        dispatch({ type: USER_LOADING });
        api_signUp(
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            (data) => {
                dispatch({
                    type: REGISTER,
                    payload: data,
                });
            },
            (err) => {
                dispatch({ type: REGISTER_FAIL });
                onApiError(err);
            },
        );
    } else {
        throw 'sign up action: not valid user sign up info';
    }
};

/**
 *
 * @param { Object } authInfo email, password
 * @callback errorHandler error call back
 */
export const login = (dispatch) => (authInfo, onApiError) => {
    console.log('Run login');
    dispatch({ type: USER_LOADING });
    if ((authInfo.email, authInfo.password)) {
        api_login(
            authInfo.email,
            authInfo.password,
            (data) => {
                console.log(data);
                dispatch({
                    type: LOGIN,
                    payload: data,
                });
            },
            (err) => {
                dispatch({ type: LOGIN_FAIL });
                console.log(err);
                onApiError(err);
            },
        );
    } else {
        throw 'login action: not valid auth info';
    }
};

// CHECK TOKEN & LOAD USER
export const loadUser = (dispatch) => () => {
    // Get token from state
    const token = Cookies.get('auth_token');
    dispatch({ type: USER_LOADING });
    try {
        api_getUser(
            token,
            (data) =>
                dispatch({
                    type: USER_LOADED,
                    payload: data,
                }),
            (err) =>
                dispatch({
                    type: AUTH_ERROR,
                }),
        );
    } catch (err) {
        console.log(err);
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// CHECK TOKEN & LOGOUT
export const logout = (dispatch) => () => {
    // Get token from state
    const token = Cookies.get('auth_token');
    dispatch({ type: USER_LOADING });
    try {
        api_logout(
            token,
            (data) =>
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: data,
                }),
            (err) =>
                dispatch({
                    type: LOGOUT_FAIL,
                }),
        );
    } catch (err) {
        console.log(err);
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

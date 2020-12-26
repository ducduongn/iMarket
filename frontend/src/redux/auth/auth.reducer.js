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

import Cookies from 'js-cookie';

const initialState = {
    token: Cookies.get('auth_token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    errors: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN:
        case REGISTER:
            // resonse success từ server
            Cookies.set('auth_token', action.payload.token, { sameSite: 'Strict' });
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token,
            };
        case AUTH_ERROR:
            Cookies.remove('auth_token');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        case LOGOUT_FAIL:
            return state;
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            Cookies.remove('auth_token');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        case AUTH_ERROR_HANDLE:
            return {
                ...state,
                errors: null,
            };
        default:
            return state;
    }
}

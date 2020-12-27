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
    FETCH_SUCCESS,
    FETCH_FAIL,
} from './auth.types';

import Cookies from 'js-cookie';
import { AuthState, LoginResponse, LoginResponseError, UserResponse } from './auth.d';

const initialState: AuthState = {
    token: Cookies.get('auth_token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    errors: null,
};

export default function (state: AuthState = initialState, action: { type: string; payload: unknown }): AuthState {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload as UserResponse,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            // resonse success từ server
            const payload = action.payload as LoginResponse;
            Cookies.set('auth_token', payload.token, { sameSite: 'Strict' });
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload.user,
                token: payload.token,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: null,
                errors: action.payload as LoginResponseError,
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
        case FETCH_FAIL:
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

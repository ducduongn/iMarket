import axios from 'axios';
import Cookies from 'js-cookie';
import { func } from 'prop-types';

const SIGN_UP_URL = '/account/signup';
const LOGIN_URL = '/account/login';
const LOGOUT_URL = '/account/logout';
const GET_USER_URL = '/account/user';

// Setup config with token - helper function
export const addAuthHeaders = (method, token) => {
    // If token, add to headers config
    if (token) return { headers: Object.assign({ Authorization: `Token ${token}` }, axios.defaults.headers[method]) };
    return null;
};

const api_post_method = function (
    url,
    data,
    config,
    succesCallback,
    apiErrorCallback = console.log,
    otherErrorCallback = console.log,
) {
    console.log('Run api_post_method');
    axios
        .post(url, data, config)
        .then((res) => {
            console.log('Callback call');
            succesCallback(res.data);
        })
        .catch((err) => apiErrorCallback(err.response.data));
};

const api_get_method = function (
    url,
    data,
    config,
    succesCallback,
    apiErrorCallback = console.log,
    otherErrorCallback = console.log,
) {
    console.log('Run api_post_method');
    if (data) {
        if (!config) {
            config = {};
        }
        config = { ...config, params: data };
    }
    axios
        .get(url, config)
        .then((res) => {
            console.log('Callback call');
            succesCallback(res.data);
        })
        .catch((err) => apiErrorCallback(err));
};

export const api_signUp = function (firstName, lastName, email, password, callback, apiErrorCallback) {
    api_post_method(SIGN_UP_URL, { firstName, lastName, email, password }, null, callback, apiErrorCallback);
};

export const api_login = function (email, password, callback, apiErrorCallback) {
    api_post_method(LOGIN_URL, { email, password }, null, callback, apiErrorCallback);
};

export const api_logout = function (token, callback, apiErrorCallback) {
    const authHeaders = addAuthHeaders('post', token);
    if (!authHeaders) {
        throw 'api_logout: Failed to create authHeaders';
    }
    api_post_method(LOGOUT_URL, {}, authHeaders, callback, apiErrorCallback);
};

export const api_getUser = function (token, callback, apiErrorCallback) {
    const authHeaders = addAuthHeaders('get', token);
    if (!authHeaders) {
        throw 'api_get_user: Failed to create authHeaders';
    }
    api_get_method(GET_USER_URL, null, authHeaders, callback, apiErrorCallback);
};

import axios from 'axios';



export const api_getProductList = function (callback, apiErrorCallback) {
    axios
        .get('static/frontend/data/product_list.json')
        .then(res => callback(res.data))
        .catch((err) => errCallback(err))
}

export const api_getProductDetail = function (callback, apiErrorCallback) {
    axios
        .get('static/frontend/data/product_detail.json')
        .then(res => callback(res.data))
        .catch((err) => errCallback(err))
}
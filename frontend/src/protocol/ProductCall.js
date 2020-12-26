import axios from 'axios';

export const api_getCategory = (callback, errCallback) => {
    return axios
        .get('api/category')
        .then((res) => callback(res.data))
        .catch((err) => errCallback(err));
};

export const api_getProductList = function (callback, apiErrorCallback) {
    // axios
    //     .get('static/frontend/data/product_list.json')
    //     .then(res => callback(res.data))
    //     .catch((err) => errCallback(err))
    axios.get('api/products').then((res) => {
        let ret = [
            {
                title: 'LAPTOP - MACBOOK',
                icon: 'laptop',
                products: res.data.results,
            },
        ];
        callback(ret);
    });
    // .catch((err) => apiErrorCallback(err))
};

export const api_getProductListByCategory = function (is_id, category, callback, apiErrorCallback) {
    // axios
    //     .get('static/frontend/data/product_list.json')
    //     .then(res => callback(res.data))
    //     .catch((err) => errCallback(err))
    let url = 'api/tproducts?';
    if (typeof category == 'number') {
        url += `category__id=${category}`;
    } else if (typeof category == 'string') {
        if (is_id) url += `category__id=${category}`;
        else url += `category__name=${category}`;
    } else {
        throw TypeError('Wrong category type');
    }
    return axios.get(url).then((res) => {
        callback(res.data);
    });
    // .catch((err) => apiErrorCallback(err))
};

export const api_getProductDetail = function (callback, apiErrorCallback) {
    axios
        .get('static/frontend/data/product_detail.json')
        .then((res) => callback(res.data))
        .catch((err) => errCallback(err));
};

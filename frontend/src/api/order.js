import axios from 'axios';

export const getShopOrder = (onSuccess) => {
    return axios
        .get('/data/shop_order.json')
        .then((res) => onSuccess(res.data))
        .catch((err) => console.log(err));
};

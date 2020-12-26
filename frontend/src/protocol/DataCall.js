import axios from 'axios';

export const getCategory = (callback, errCallback) => {
    axios
        .get('static/testdata/amazon_category.json')
        .then((res) => callback(res.data))
        .catch((err) => errCallback(err));
};

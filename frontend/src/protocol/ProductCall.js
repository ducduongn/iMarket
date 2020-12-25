import axios from 'axios';

export const api_getCategory = (callback, errCallback) => {
    return axios
        .get('/api/category')
        .then(res => callback(res.data))
        .catch(err => errCallback(err))
}

export function buildCategoryTree(response) {
    let root = {}
    let category_name = {}
    response.map(value => {
        category_name[value.id] = value.name
        if (value.parent) {
            if (value.parent in root) {
                root[value.parent].push(value.id)
            } else {
                root[value.parent] = [value.id]
            }
        } else {
            if (!(value.id in root)) {
                root[value.id] = []
            }
        }
    })
    return [root, category_name]
}

export function CateIdToName(root, id_name) {
    let category = {}
    for (let c in root) {
        let sub = []
        root[c].map(v => sub.push(id_name[v]))
        category[id_name[c]] = sub
    }
    return category
}


export const api_getProductList = function (callback, apiErrorCallback) {
    // axios
    //     .get('static/frontend/data/product_list.json')
    //     .then(res => callback(res.data))
    //     .catch((err) => errCallback(err))
    axios
        .get("api/products")
        .then(res => {
            let ret = [
                {
                    "title": "LAPTOP - MACBOOK",
                    "icon": "laptop",
                    "products": res.data.results
                }
            ];
            callback(ret);
        })
    // .catch((err) => apiErrorCallback(err))
}

export const api_getProductListByCategory = function (is_id, category, page_size, page_number, callback, apiErrorCallback) {
    // axios
    //     .get('static/frontend/data/product_list.json')
    //     .then(res => callback(res.data))
    //     .catch((err) => errCallback(err))
    let url = "/api/tproducts"
    let params = {}
    if (typeof category == "number") {
        params["category__id"] = category
    } else if (typeof category == "string") {
        if (is_id)
            params["category__id"] = category
        else
            params["category__name"] = category
    } else {
        throw TypeError("Wrong category type")
    }
    if (!typeof page_size == 'number' || !typeof page_number == 'number')
        throw TypeError("page_size and page_number is number")
    else if (page_size <= 0 || page_number < 0)
        throw RangeError("Error page_size <= 0 or page_number < 0")
    params["page_size"] = page_size
    params["page_number"] = page_number
    return axios
        .get(url, { params })
        .then(res => {
            callback(res.data);
        })
    // .catch((err) => apiErrorCallback(err))
}

export const api_getProductDetail = function (callback, apiErrorCallback) {
    axios
        .get('static/frontend/data/product_detail.json')
        .then(res => callback(res.data))
        .catch((err) => errCallback(err))
}
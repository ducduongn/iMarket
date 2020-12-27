import axios from 'axios';
import { number } from 'yargs';
import { PRODUCT_DETAIL, PDType } from '../../objects/ProductDetail';
import { ProductCardView, ProductListApiResponse, ProductModelResponse, ProductResponse } from './product.d';

function arrayEquals(a: Array<unknown>, b: Array<unknown>) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
}

// ---------------------- Selections --------------------------------------
export function res2plist(res: { results: ProductResponse[] }): ProductResponse[] {
    return res.results;
}

export function tierInd2model(inds: number[], models: ProductModelResponse[]): ProductModelResponse | undefined {
    if (inds.length == 0) return undefined;
    const ret = models.find((m) => arrayEquals(m.tier_index, inds));
    console.log('tierInd2model');
    console.log(inds, ret);
    return ret;
}


// ---------------------- Transform Functions ----------------------------

export function res2cards(res: ProductListApiResponse): ProductCardView[] {
    return pds2cards(res2plist(res))
}

export function pd2card(prod: ProductResponse): ProductCardView {
    const { itemid, name, image, rating, oldprice, models } = prod;
    const res: ProductCardView = {
        itemid,
        name,
        image,
        price: Math.min(...models.map((m) => m.price)),
        rating_star: rating.rating_star,
        oldprice: undefined,
    };
    if (oldprice > 0) res['oldprice'] = oldprice;
    return res;
}

export function pds2cards(prods: ProductResponse[]): ProductCardView[]{
    return prods.map((pRes) => pd2card(pRes));
}

export type ApiGetProductList = {
    onSuccess: (data: ProductListApiResponse) => unknown;
    limit?: number;
    offset?: number;
    query?: string;
    ordering?: string;
};

export function api_get_productList(params: ApiGetProductList): void {
    const {onSuccess, limit = 0, offset = 0, query = "", ordering = ""} = params;
    axios.get(`/api/v1/martService/products/?search=${query}&ordering=${ordering}&limit=${limit}&offset=${offset}`).then((res) => {
        const data: ProductListApiResponse = res.data;
        onSuccess(data);
    });
}

export function api_get_productDetail(itemid: number, onSuccess: (data: ProductResponse) => unknown): void {
    axios.get(`/api/v1/martService/products/${itemid}`).then((res) => {
        const pd = res.data;
        onSuccess(pd);
    });
}

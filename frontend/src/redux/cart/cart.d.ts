import { ADD_TO_CART } from './cart.types';

export type ShopOrderIdsType = Array<CartItemType>;
export type CartItemType = {
    shopid: number;
    itemid: number;
    modelid: number;
    quantity: number;
};

export type AddToCartAction = {
    type: typeof ADD_TO_CART;
    payload: CartItemType;
};

export type TierVariation = {
    name: string;
    options: string[];
    images: string[];
};
export type Model = {
    itemid: number;
    modelid: number;
    name: string;
    price: number;
    currency: string;
    sold: number;
    price_before_discount: number;
    tier_index: number[];
};
export type ModelOrderType = {
    itemid: number;
    name: string;
    shopid: number;
    model_name: string;
    modelid: number;
    oldprice: number;
    origin_cart_item_price: number;
    price: number;
    quantity: number;
    stock: number;
    tier_variations: Array<TierVariation>;
    models: Array<Model>;
};

export type RowItemType = {
    shopid: number;
    itemid: number;
    modelid: number;
    name: string;
    modelname: string;
    oldprice: number;
    price: number;
    quantity: number;
};
export type CartTypes = Array<{
    shop: {
        shopid: number;
        shopname: string;
    };
    items: Array<RowItemType>;
}>;

export type ShopOrderIdsType = Array<{
    shopid: number;
    item_briefs: Array<{
        itemid: number;
        modelid: number;
        quantity: number;
    }>;
}>;

export type CartState = {
    isFetching: boolean;
    isError: boolean;
    data: CartTypes;
};

import { ADD_TO_CART, FETCH_CART_DATA, FETCH_FAIL, FETCH_SUCCESS, SET_FETCHING, SET_IS_ERROR } from './cart.types';
import { selectModelItemInCart } from './cart.manager';
import { ShopOrderIdsType, CartItemType, CartTypes, CartState } from './cart';

export const INITIAL_STATE: CartState = {
    isFetching: false,
    isError: false,
    data: [],
};

const cartReducer = (state: CartState = INITIAL_STATE, action: { type: string; payload: unknown }): CartState => {
    switch (action.type) {
        case SET_FETCHING:
            return { ...state, isFetching: action.payload as boolean };
        case SET_IS_ERROR:
            return { ...state, isError: action.payload as boolean };
        case FETCH_FAIL:
            return { ...state, isError: false, isFetching: false };
        case FETCH_SUCCESS:
            return { isFetching: false, isError: false, data: action.payload as CartTypes };
        default:
            return state;
    }
};

export function createCartItem(shopid: number, itemid: number, modelid: number, quantity: number): CartItemType {
    return { shopid, itemid, modelid, quantity };
}

export default cartReducer;

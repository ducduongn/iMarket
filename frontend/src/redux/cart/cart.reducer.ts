import { ADD_TO_CART, FETCH_FAIL, FETCH_SUCCESS, SET_FETCHING, SET_IS_ERROR, CLEAR_CART } from './cart.types';
import { CartItemType, CartTypes, CartState, CartItem } from './cart';
import { ProductResponse } from '../product/product.d';
import { addCartItem } from './cart.manager';

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
        case ADD_TO_CART:
            const payload = action.payload as CartItem;
            return { isFetching: false, isError: false, data: addCartItem(state.data, payload).tableData };
        case CLEAR_CART:
            return { isFetching: false, isError: false, data: []};
        default:
            return state;
    }
};

export function createCartItem(shopid: number, itemid: number, modelid: number, quantity: number): CartItemType {
    return { shopid, itemid, modelid, quantity };
}

export default cartReducer;

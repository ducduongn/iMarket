import cartReducer, { INITIAL_STATE } from './cart.reducer';
import * as CartActionTypes from './cart.types';

const add_to_cart_payload1 = {
    shopid: 98765,
    itemid: 1,
    modelid: 198765,
    quantity: 543,
};

const add_to_cart_payload2 = {
    shopid: 98765,
    itemid: 2,
    modelid: 298765,
    quantity: 543,
};

// const add_to_cart_payload3 = {
//     shopid: 98766,
//     itemid: 3,
//     modelid: 398766,
//     quantity: 543,
// };

const state1 = [add_to_cart_payload1];

const state2 = [add_to_cart_payload1, add_to_cart_payload2];

describe('cart reducer', () => {
    it('should return the initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should handle ADD_TO_CART', () => {
        expect(
            cartReducer([], {
                type: CartActionTypes.ADD_TO_CART,
                payload: add_to_cart_payload1,
            }),
        ).toEqual(state1);

        expect(
            cartReducer(state1, {
                type: CartActionTypes.ADD_TO_CART,
                payload: add_to_cart_payload2,
            }),
        ).toEqual(state2);

        expect(
            cartReducer(state1, {
                type: CartActionTypes.ADD_TO_CART,
                payload: add_to_cart_payload1,
            }),
        ).toEqual(state1);
    });
});

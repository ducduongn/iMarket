import * as CartActionTypes from './cart.types';
import { AddToCartAction, CartItemType } from './cart';

export const addItem = (item: CartItemType): AddToCartAction => ({
    type: CartActionTypes.ADD_TO_CART,
    payload: item,
});

// export const removeItem = (item) => ({
//     type: CartActionTypes.REMOVE_ITEM,
//     payload: item,
// });

// export const clearItemFromCart = (item) => ({
//     type: CartActionTypes.CLEAR_ITEM_FROM_CART,
//     payload: item,
// });

// export const clearCart = () => ({
//     type: CartActionTypes.CLEAR_CART,
// });

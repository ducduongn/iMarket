import {ADD_TO_CART, REMOVE_FROM_CART} from './types'

const initialState = {
    numProduct: 0,
    listProducts: [],
};

export default function(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART:
            if (!state.listProducts.find(p => p.productId == action.payload.productId)){
                return {
                    numProduct: state.numProduct + 1,
                    listProducts: [...state.listProducts, action.payload]
                }
            }
        case REMOVE_FROM_CART:
            if (state.listProducts.find(p => p.productId == action.payload.productId)){
                
                return {
                    numProduct: state.numProduct - 1,
                    listProducts: [...state.listProducts.filter(product => product.productId != action.payload.productId)]
                }
            }
        default:
            return state
    }
}

export const addToCart = (dispatch) => (product) => {
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    })
}

export const removeFromCart = (dispatch) => (product) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: product,
    })
}
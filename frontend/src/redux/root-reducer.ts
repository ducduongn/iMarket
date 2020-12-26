import { combineReducers } from 'redux';

import cartReducer from './cart/cart.reducer';
import authReducer from './auth/auth.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

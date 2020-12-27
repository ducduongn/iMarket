import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootAuthSaga from './auth/auth.saga';
import rootCartSaga from './cart/cart.saga';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [logger, sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootCartSaga);
sagaMiddleware.run(rootAuthSaga);

export const action = (type, payload) => store.dispatch({type, payload});
export default store;

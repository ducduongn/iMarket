import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootCartSaga from './cart/cart.saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [logger, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootCartSaga);

export const action = type => store.dispatch({type});
export default store;

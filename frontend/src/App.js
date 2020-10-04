import React from 'react';
import PropTypes from 'prop-types';

//Redux store
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';

import { loadUser } from './redux/reducers/auth';


// Material UI

//Router
import {
  Router,
  Switch,
  Route} from "react-router-dom";
import history from './router/history'

// My Components
import AuthSite from './Sites/Auth'
import Home from './Sites/Home'
import { ProductDetail } from './Sites/ProductDetail';
// Icons

// Data



function App() {
  // Đăng nhập nếu có token trong Coolie
  const auth = useSelector(state => state.auth)
  if (auth.token && !auth.isAuthenticated && !auth.isLoading)
    loadUser(useDispatch())()
  
  return (
    <Router history={history}>
      <Switch>
        <Route path='/auth/:subpath(login|signup)' component={AuthSite} />
        <Route path="/detail" component={ProductDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};

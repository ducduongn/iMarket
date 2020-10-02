import React from 'react';
import PropTypes from 'prop-types';

//Redux store
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';

import { loadUser } from './reducers/auth';


// Material UI
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

//Router
import {
  Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import history from './router/history'

// My Components
import { AuthForm } from './component/auth/AuthForms'
import Home from './Sites/Home'
import SignInSide from './component/auth/SignInSide';
// Icons

// Data



function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  if (auth.token && !auth.isAuthenticated && !auth.isLoading)
    loadUser()(dispatch)
  return (
    <Router history={history}>
      <Switch>
        <Route path='/auth/:subpath(login|signup)' component={SignInSide} />
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

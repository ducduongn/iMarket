import './App.css';
import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { defaultTheme } from './themes';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import GlobalStyles from './GlobalStyles';
import Pace from './Pages/shared/components/Pace';
import { action } from './redux/store';
import { FETCH_USER } from './redux/auth/auth.types';
import { FETCH_CART_DATA } from './redux/cart/cart.types';
import SnackbarProvider, { useSnackbar } from './Pages/shared/components/SnackbarProvider';
import { useSelector } from 'react-redux';

const HomePage = lazy(() => import('./Pages/Shopping/components/Main'));
const LoggedInComponent = lazy(() => import('./Pages/logged_in/components/Main'));
// const Login = lazy(() => import('./Pages//Login'));

function App(): JSX.Element {
    return (
        <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <GlobalStyles />
            <Pace color={defaultTheme.palette.primary.light} />
            <Suspense fallback={<Fragment />}>
                <SnackbarProvider>
                    <SubApp>
                        <Switch>
                            <Route path="/c">
                                <LoggedInComponent />
                            </Route>
                            {/* <Route exact path="/login" component={Login} /> */}
                            <Route path="/" component={HomePage} />
                        </Switch>
                    </SubApp>
                </SnackbarProvider>
            </Suspense>
        </MuiThemeProvider>
    );
}

function SubApp(props): JSX.Element {
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        action(FETCH_USER);
        action(FETCH_CART_DATA);
    }, []);
    const snackbar = useSnackbar();
    useEffect(() => {
        if (auth.user && !auth.user.is_verified) snackbar.info({ text: 'Your account is not verify' });
    }, [auth]);
    return <>{props.children}</>;
}

export default App;

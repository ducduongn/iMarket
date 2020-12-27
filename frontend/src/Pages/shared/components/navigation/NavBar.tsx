import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import CartIcon from '../cart-icon/cart-icon.component';
import { CartIconButton, AccountIconButton, NotiIconButton, MenuIconButton, SearchIconButton } from './IconButtons';
import useStyles from './NavBar.style';
import { Link, useHistory } from 'react-router-dom';
import DialogSelector from './DialogSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root-reducer';
import { Button } from '@material-ui/core';

function PrimaryHeaderBar(): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const authState = useSelector((state: RootState) => state.auth);
    const menuId = 'primary-search-account-menu';
    const [dialogOpen, setDialogOpen] = useState<string | null>(null);
    const closeDialog = useCallback(() => {
        setDialogOpen(null);
    }, [setDialogOpen]);
    const openLoginDialog = useCallback(() => {
        setDialogOpen('login');
    }, [setDialogOpen]);

    const openRegisterDialog = useCallback(() => {
        setDialogOpen('register');
        // setIsMobileDrawerOpen(false);
    }, [setDialogOpen]);

    const openTermsDialog = useCallback(() => {
        setDialogOpen('termsOfService');
    }, [setDialogOpen]);
    const openChangePasswordDialog = useCallback(() => {
        setDialogOpen('changePassword');
    }, [setDialogOpen]);

    useEffect(() => {
        if (authState.isAuthenticated) closeDialog();
    }, [authState.isAuthenticated]);

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color="inherit" elevation={1}>
                <Toolbar variant="regular" className={classes.toolbar}>
                    <MenuIconButton className={`${classes.navbarIcon} ${classes.menuButton}`} />
                    <Link to="/">
                        <Typography className={classes.title} variant="h4">
                            IMark
                        </Typography>
                    </Link>

                    <div className={classes.grow} />
                    <SearchIconButton />
                    <NotiIconButton />
                    <CartIconButton />
                    {authState.isAuthenticated ? (
                        <AccountIconButton
                            tooltip="Account"
                            onClick={() => history.push('/c/dashboard')}
                            menuId={menuId}
                        />
                    ) : (
                        <Button onClick={openLoginDialog}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
            <DialogSelector
                openLoginDialog={openLoginDialog}
                dialogOpen={dialogOpen}
                onClose={closeDialog}
                openTermsDialog={openTermsDialog}
                openRegisterDialog={openRegisterDialog}
                openChangePasswordDialog={openChangePasswordDialog}
            />
        </div>
    );
}

export default PrimaryHeaderBar;
// export default Searchbar;

import React, { useCallback, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import CartIcon from '../cart-icon/cart-icon.component';
import { CartIconButton, AccountIconButton, NotiIconButton, MenuIconButton, SearchIconButton } from './IconButtons';
import useStyles from './NavBar.style';
import { Link } from 'react-router-dom';
import DialogSelector from './DialogSelector';

function PrimaryHeaderBar(): JSX.Element {
    const classes = useStyles();
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
                    <AccountIconButton onClick={openLoginDialog} menuId={menuId} />
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

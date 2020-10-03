import React, { Fragment } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Category from './Category'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Hidden } from '@material-ui/core';

// Icons 

// Actions
import { logout } from '../../redux/reducers/auth'

// Router
import history from '../../router/history'
import { LOGIN_URL, SIGNUP_URL } from '../../router/urls';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    navButton: {
        marginRight: theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            }
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
    },
}));

export default function TopNavBar(props) {
    const { className } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    const authState = useSelector(state => ({
        "isAuthenticated": state.auth.isAuthenticated,
        "isLoading": state.auth.isLoading
    }))

    const logoutAction = logout(useDispatch()) //used for logout

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogout = () => {
        logoutAction()
        setAnchorEl(null);
        handleMobileMenuClose();
    };


    const menuItem = (value) => value ? [
        ["Profile", handleMenuClose],
        ["My account", handleMenuClose],
        ["Logout", handleLogout],
    ] : [
            ["Login", () => { history.push(LOGIN_URL), handleMenuClose() }],
            ["Sign Up", () => { history.push(SIGNUP_URL), handleMenuClose() }],
        ]
    const menuId = 'primary-search-account-menu';
    const renderMenu = (

        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                menuItem(authState.isAuthenticated).map((value) =>
                    <MenuItem key={value[0]} onClick={value[1]}>{value[0]}</MenuItem>)
            }
        </Menu >

    );

    const authUserIcon = (
        <Fragment>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        </Fragment>
    )

    const guestUserIcon = (
        <Fragment>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        </Fragment>
    )

    const mobileSearchId = 'primary-search-mobile';

    return (
        <Fragment>
            <AppBar position="fixed" className={className}>
                <Toolbar>
                    <Button >
                        <Category buttonClass={classes.navButton} />
                    </Button>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>
                    <Hidden smUp>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="search"
                                aria-controls={mobileSearchId}
                                color="inherit"
                            >
                                <SearchIcon />
                            </IconButton>
                        </div>
                    </Hidden>
                    {authState.isAuthenticated ? authUserIcon : guestUserIcon}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Fragment>
    );
}

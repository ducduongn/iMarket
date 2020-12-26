import { fade, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },

    toolbar: {
        width: '100%',
        margin: '0 auto',
        padding: '0 16px',
        minHeight: '64px',
        maxWidth: '1140px',
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
            //   width: 'auto',
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
            width: '30ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    sectionMobileHide: {
        display: 'none',
        whiteSpace: 'nowrap',
    },
    sectionMobileShow: {
        whiteSpace: 'nowrap',
        display: 'relative',
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    navbarIcon: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

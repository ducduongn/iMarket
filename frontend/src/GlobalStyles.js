import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    '@global': {
        /**
         * Disable the focus outline, which is default on some browsers like
         * chrome when focusing elements
         */

        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },

        '*:focus': {
            outline: 0,
        },

        body: {
            background: '#f4f4f4',
        },

        a: {
            textDecoration: 'none',
            cursor: 'pointer',
        },

        '.text-white': {
            color: theme.palette.common.white,
        },

        '.block': {
            display: 'block',
        },

        '.no-shadow': {
            boxShadow: 'none',
        },

        // ------------------------Size--------------------------

        '.fullSize': {
            width: '100%',
            height: '100%',
        },

        '.auto-height': {
            height: 'auto',
        },

        '.auto-width': {
            width: 'auto',
        },

        '.floatHover': {
            transition: 'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
            '&:hover': {
                transform: 'translate3d(0,-5px,0)',
                boxShadow: '0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
            },
        },

        section: {
            width: '100%',
            margin: '0 auto',
            maxWidth: '1280px',
            padding: '16px 0px',
        },

        // ------------------------Color--------------------------
        '.white': {
            color: '#ffffff',
        },
        '.white-background': {
            background: '#ffffff',
        },
        // ------------------------IMAGE--------------------------

        '.fitContain': {
            objectFit: 'contain',
        },
        // ------------------------TEXT--------------------------
        '.boldText': {
            fontWeight: 'bold',
        },
        // ------------------------Border Decoration--------------------------

        '.no-border': {
            border: 'none',
        },

        '.top-divider': {
            borderTop: '1px solid rgb(242, 242, 242)',
            marginTop: '16px',
        },
        '.pad-top-divider': {
            padding: '16px 0 0 0',
        },
        // "body": {
        //   width: "100%",
        //   height: "100%",
        // },

        '.listItemLeftPadding': {
            paddingTop: `${theme.spacing(1.75)}px !important`,
            paddingBottom: `${theme.spacing(1.75)}px !important`,
            paddingLeft: `${theme.spacing(4)}px !important`,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: `${theme.spacing(4)}px !important`,
            },
            '@media (max-width:  420px)': {
                paddingLeft: `${theme.spacing(1)}px !important`,
            },
        },
        '.container': {
            width: '100%',
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            marginRight: 'auto',
            marginLeft: 'auto',
            [theme.breakpoints.up('sm')]: {
                maxWidth: 540,
            },
            [theme.breakpoints.up('md')]: {
                maxWidth: 720,
            },
            [theme.breakpoints.up('lg')]: {
                maxWidth: 1170,
            },
        },
        '.row': {
            display: 'flex',
            flexWrap: 'wrap',
            marginRight: -theme.spacing(2),
            marginLeft: -theme.spacing(2),
        },
        '.container-fluid': {
            width: '100%',
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            marginRight: 'auto',
            marginLeft: 'auto',
            maxWidth: 1370,
        },
        '.lg-mg-top': {
            marginTop: `${theme.spacing(20)}px !important`,
            [theme.breakpoints.down('md')]: {
                marginTop: `${theme.spacing(18)}px !important`,
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: `${theme.spacing(16)}px !important`,
            },
            [theme.breakpoints.down('xs')]: {
                marginTop: `${theme.spacing(14)}px !important`,
            },
        },
        '.lg-mg-bottom': {
            marginBottom: `${theme.spacing(20)}px !important`,
            [theme.breakpoints.down('md')]: {
                marginBottom: `${theme.spacing(18)}px !important`,
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: `${theme.spacing(16)}px !important`,
            },
            [theme.breakpoints.down('xs')]: {
                marginBottom: `${theme.spacing(14)}px !important`,
            },
        },
        '.lg-p-top': {
            paddingTop: `${theme.spacing(20)}px !important`,
            [theme.breakpoints.down('md')]: {
                paddingTop: `${theme.spacing(18)}px !important`,
            },
            [theme.breakpoints.down('sm')]: {
                paddingTop: `${theme.spacing(16)}px !important`,
            },
            [theme.breakpoints.down('xs')]: {
                paddingTop: `${theme.spacing(14)}px !important`,
            },
        },
        code: {
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
        },
    },
});

function globalStyles() {
    return null;
}

export default withStyles(styles, { withTheme: true })(globalStyles);

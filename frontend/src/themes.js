import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breackpoints = createBreakpoints({});
// border
const borderWidth = 2;
const borderColor = 'rgba(0, 0, 0, 0.13)';
export const defaultTheme = createMuiTheme({
    palette: {
        type: 'light',
        // primary: {
        //     main: "#1976d2",
        // },
        secondary: {
            main: '#5850ec',
        },
        text: {
            primary: '#263238',
        },
        background: {
            default: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica",  sans-serif, "Arial"',

        h3: {
            // fontFamily: 'Lato',
            fontSize: '2rem',
            [breackpoints.up('sm')]: {
                fontSize: '2.5707rem',
            },
            [breackpoints.up('md')]: {
                fontSize: '2.7849rem',
            },
            [breackpoints.up('lg')]: {
                fontSize: '2.9991rem',
            },
        },
        h4: {
            fontSize: '1.5625rem',
            [breackpoints.up('sm')]: {
                fontSize: '1.8219rem',
            },
            [breackpoints.up('md')]: {
                fontSize: '2.0243rem',
            },
            [breackpoints.up('lg')]: {
                fontSize: '2.0243rem',
            },
        },
        h5: {
            // fontFamily: '"Roboto", "Helvetica",  sans-serif, "Arial"',
            // fontSize: '1.125rem',
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '-0.05px',
            // [breackpoints.up('sm')]: {
            //     fontSize: '1.25rem',
            // },
            // [breackpoints.up('md')]: {
            //     fontSize: '1.375rem',
            // },
            // [breackpoints.up('lg')]: {
            //     fontSize: '1.5rem',
            // },
        },
        h6: {
            fontSize: '0.8125rem',
            fontWeight: '400',
            [breackpoints.up('sm')]: {
                fontSize: '0.8125rem',
            },
            [breackpoints.up('md')]: {
                fontSize: '0.9375rem',
            },
            [breackpoints.up('lg')]: {
                fontSize: '1.0625rem',
            },
        },
    },
    border: {
        borderColor: borderColor,
        borderWidth: borderWidth,
    },
});
defaultTheme.shadows[8] = '0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)';

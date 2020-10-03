/**
 * Site Base làm nền cho các site khác
 */

import React, { } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Material UI
import { Container, Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

// My Components
import NavBar from '../component/HeaderBar/NavBar'
import Header from '../component/Header';

// Icons
import { darkTheme } from '../themes'
// Data
import { sections } from '../testdata/Home'
import Copyright from '../component/layout/Copyright';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
    },
    container: {
        flex: "1 0 auto",
    },
    footer: {
        flexShrink: 0,
        padding: theme.spacing(3, 2),
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

/**
 * Site Base làm nền cho các site khác
 * 
 */
export const Base = (props) => {

    const classes = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {/* <Header title="Blog" sections={sections} /> */}
            <NavBar />

            <div className={classes.wrapper}>
                <Toolbar></Toolbar>
                <Container maxWidth="lg" className={classes.container}>
                    {props.children}
                </Container>
                <footer className={classes.footer}>
                    <Container maxWidth="sm">
                        <Copyright />
                    </Container>
                </footer>
            </div>
        </ThemeProvider >
    );
}

Base.propTypes = {
    children: PropTypes.node.isRequired,
}

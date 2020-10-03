import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Container, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

// My Components
import NavBar from '../component/HeaderBar/NavBar'
import MainFeaturedPost from '../component/MainFeature';
import ListProduct from '../component/ListProduct/ListProduct';
import Header from '../component/Header';
import FeaturedPost from '../component/FeaturePost';

// Icons
import { darkTheme } from '../themes'
// Data
import { sections, featuredPosts, mainFeaturedPost } from '../testdata/Home'

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));


function ResponsiveDrawer() {
    const classes = useStyles();
    // const [] = React.useState(false);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header title="Blog" sections={sections} />
            <NavBar className={classes.appBar} />
            {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} icon={post.icon} />
                    ))}
                </Grid>
            </Container>
            <ListProduct />

        </ThemeProvider >
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;

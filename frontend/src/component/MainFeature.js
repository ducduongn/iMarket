import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        // backgroundImage: 'url(https://storage-asset.msi.com/global/picture/banner/banner_15958410275f1e9a03d0364.jpg)',
        // backgroundSize: 'fill',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        // backgroundColor: 'rgba(0,0,0,.3)',s
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

export default function MainFeaturedPost(props) {
    const classes = useStyles();
    const { post } = props;

    return (
        <Paper className={classes.mainFeaturedPost}>
            {/* style={{ backgroundImage: `url(${post.image})` }}> */}
            {/* Increase the priority of the hero background image */}
            {/* {<img style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }} src={post.image} alt={post.imageText} />} */}
            <picture>
                <source srcset="https://lh3.googleusercontent.com/axm2STIgadqOeavtNufDiESLYRpqnUmxqtuJcKZRvdoQNE8D0hNd--C_pAkE_aY_YkUDk0bV0nBaRR6Cuzc=w1920-rw" type="image/webp" />
                <source srcset="https://lh3.googleusercontent.com/axm2STIgadqOeavtNufDiESLYRpqnUmxqtuJcKZRvdoQNE8D0hNd--C_pAkE_aY_YkUDk0bV0nBaRR6Cuzc=w1920" type="image/png" />
                <img class="lazyload css-o4eu2v" alt="" data-src="https://lh3.googleusercontent.com/axm2STIgadqOeavtNufDiESLYRpqnUmxqtuJcKZRvdoQNE8D0hNd--C_pAkE_aY_YkUDk0bV0nBaRR6Cuzc=w1920-rw"
                    src="https://lh3.googleusercontent.com/axm2STIgadqOeavtNufDiESLYRpqnUmxqtuJcKZRvdoQNE8D0hNd--C_pAkE_aY_YkUDk0bV0nBaRR6Cuzc=w1920-rw" loading="lazy" decoding="async" />
            </picture>
        </Paper>
    );
}

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};
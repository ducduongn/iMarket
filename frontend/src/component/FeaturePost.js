import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Button, CardActions, CardHeader, IconButton, Paper } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { productData } from '../testdata/Home';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    card: {
        // display: 'flex',
        // width: "100%"
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    paper: {
        maxWidth: "100%",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    root: {
        maxWidth: 345,
        boxShadow: "none",
    },
    media: {
        height: 200,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
})
);

function ReviewCard(props) {
    const { image, title, name, price } = props
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={"https://phongvu.vn" + image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography noWrap gutterBottom variant="caption" component="h2">
                        {name}
                    </Typography>
                    <Typography>
                        {price}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand)}
                        aria-label="show more"
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default function FeaturedPost(props) {
    const classes = useStyles();
    const { post, icon } = props;

    return (
        <Grid item xs={12} md={12}>
            {/* <CardActionArea> */}
            <Card className={classes.card}>
                <CardHeader
                    title={post.title}
                    avatar={icon}
                    action={
                        <IconButton aria-label="settings">
                            <MoreHorizIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Grid>
                        <Grid container spacing={1}>
                            {
                                productData.slice(0, 8).map(value =>
                                    <Grid item xs={12} sm={4} lg={3} key={value[0]}>
                                        <ReviewCard
                                            name={value[0]}
                                            image={value[1]}
                                            price={value[2]}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* </CardActionArea> */}
        </Grid >
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};

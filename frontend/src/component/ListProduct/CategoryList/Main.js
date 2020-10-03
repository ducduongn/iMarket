import React, { Fragment } from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import ProductReviewCard from './ReviewCard/ProductReviewCard';
import { listProduct } from '../../testdata/ListProduct'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function Main() {
    const [spacing, setSpacing] = React.useState(4);
    const classes = useStyles();


    const numProductPerLine = 3;
    console.log(listProduct.length)
    console.log([...Array(Math.floor(listProduct.length / 3)).keys()])
    const lines = [...Array(Math.floor(listProduct.length / 3)).keys()].map(value => {
        const start = value * numProductPerLine;
        const end = Math.min((value + 1) * numProductPerLine, listProduct.length);
        return (
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {listProduct.slice(start, end).map((value, i) => (
                        <Grid key={i} item>
                            <ProductReviewCard name={value[0]} image={value[1]} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        )
    })
    return (
        <Fragment >
            {/* <ProductReviewCard name={listProduct[5][0]} image={listProduct[5][1]} /> */}
            <Grid container className={classes.root} spacing={2}>
                {lines}
            </Grid>
        </Fragment>
    )
}
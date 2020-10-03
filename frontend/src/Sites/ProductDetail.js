import React, { Fragment } from 'react'
import { connect } from 'react-redux'

// Material UI
import { Breadcrumbs, Card, Grid, Typography } from '@material-ui/core';

// My Components

// Icons

// Data
import { api_getProductDetail } from '../protocol/ProductCall';
import { Base } from './Base';
import { Link } from 'react-router-dom';
import history from '../router/history';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export const ProductDetail = () => {
    const [detail, setDetail] = React.useState();
    React.useEffect(() => {
        api_getProductDetail(setDetail)
    }, [])
    console.log(detail)
    return (
        <Base>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={() => history.push("/")}>
                    Home
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                    Laptop
                </Link>
                <Typography color="textPrimary">SKU</Typography>
            </Breadcrumbs>
            <Card>
                <Grid container>
                    <Grid item sm={4}>
                    </Grid>
                    <Grid item sm={8}>
                        {
                            detail &&
                            <Fragment>
                                <Typography variant="h5">
                                    {detail.title}
                                </Typography>
                                <Typography variant="caption" >By {detail.brand}</Typography>
                                <Typography variant="h4">{detail.price}</Typography>
                            </Fragment>
                        }
                    </Grid>
                </Grid>
            </Card>
        </Base>
    );
}

ProductDetail.propTypes = {
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)

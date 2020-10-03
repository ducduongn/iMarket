import React from 'react';

// Material UI
import { Grid } from '@material-ui/core';

// My Components
import FeaturedPost from '../component/ListProduct/HomeList/FeaturePost';

// Icons
// Data
import { api_getProductList } from '../protocol/ProductCall';
import { Base } from './Base';

function ResponsiveDrawer() {
    const [productList, setProductList] = React.useState([]);

    React.useEffect(() => {
        api_getProductList(setProductList)
    }, [])

    return (
        <Base >
            <Grid container spacing={4}>
                {productList.map((post) => (
                    <FeaturedPost key={post.title} title={post.title} productList={post.products} icon={post.icon} />
                ))}
            </Grid>
        </Base>
    );
}

ResponsiveDrawer.propTypes = {

};

export default ResponsiveDrawer;

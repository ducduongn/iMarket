import React from 'react';

// Material UI
import { Grid } from '@material-ui/core';

// My Components
import FeaturedPost from '../component/ListProduct/HomeList/FeaturePost';

// Icons
// Data
import { api_getProductList, api_getProductListByCategory, api_getCategory, buildCategoryTree } from '../protocol/ProductCall';
import { Base } from './Base';

function ResponsiveDrawer() {
    const [productList, setProductList] = React.useState([]);

    React.useEffect(() => {
        api_getCategory(data => {
            let [tree, category_name] = buildCategoryTree(data)
            let products = [];
            let promises = Object.keys(tree).map(id =>
                api_getProductListByCategory(true, id, 4, 0, data => {
                    products.push({
                        title: category_name[id],
                        icon: "laptop",
                        products: data.results
                    })
                })
            )
            Promise.all(promises).then(() => setProductList(products))
        }, console.log)
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

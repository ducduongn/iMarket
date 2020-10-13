import React from 'react';

// Material UI
import { Grid } from '@material-ui/core';

// My Components
import FeaturedPost from '../component/ListProduct/HomeList/FeaturePost';

// Icons
// Data
import { api_getProductList, api_getProductListByCategory, api_getCategory } from '../protocol/ProductCall';
import { Base } from './Base';

function buildCategoryTree(response) {
    let root = {}
    let category_name = {}
    response.map(value => {
        category_name[value.id] = value.name
        if(value.parent){
            if(value.parent in root){
                root[value.parent].push(value.id)
            } else {
                root[value.parent] = [value.id]
            }
        } else {
            if(!(value.id in root)){
                root[value.id] = []
            }
        }
    })
    return [root, category_name]
}

function ResponsiveDrawer() {
    const [productList, setProductList] = React.useState([]);

    React.useEffect(() => {
        api_getCategory(data => {
            let [tree, category_name] = buildCategoryTree(data)
            let products = [];
            let promises = Object.keys(tree).map(id => 
                api_getProductListByCategory(true, id, data => {
                    products.push({
                        title: category_name[id],
                        icon: "latop",
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

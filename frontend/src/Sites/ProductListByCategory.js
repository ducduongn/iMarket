import React, { Component } from 'react'
import { connect } from 'react-redux'

// Bae Sites
import { Base } from './Base';
import Main from '../component/ListProduct/CategoryList/Main';
import FilterSide from '../component/ListProduct/CategoryList/FilterSide';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Drawer, IconButton } from '@material-ui/core';

// Icon
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons'
import FeaturedPost from '../component/ListProduct/HomeList/FeaturePost';
import { api_getProductListByCategory } from '../protocol/ProductCall';

export function ProductListByCategory(props) {
    const [state, setState] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };
    const [productList, setProductList] = React.useState(null);
    const category_id = props.match.params.id;
    console.log(category_id)
    React.useEffect(() => {
        api_getProductListByCategory(true, category_id, 10, 0, data => {
            setProductList({
                title: "Laptop",
                icon: "laptop",
                products: data.results
            })
        })
    }, [])

    return (
        <Base>
            <Button onClick={toggleDrawer(true)}>Filter</Button>
            <Drawer
                implementation
                anchor={"left"}
                variant="persistent"
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div>
                    <IconButton onClick={toggleDrawer(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <FilterSide />
            </Drawer>
            {productList && <FeaturedPost key={productList.title} title={productList.title} productList={productList.products} icon={productList.icon} />}
        </Base>
    )
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default ProductListByCategory

// export default connect(mapStateToProps, mapDispatchToProps)(ProductListByCategory)

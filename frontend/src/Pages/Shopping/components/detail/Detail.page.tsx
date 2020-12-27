import { Box, Button, Divider, Grid, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { OptionsType, PDType, PRODUCT_DETAIL } from '../../../../objects/ProductDetail';
import { p2cartItem } from '../../../../redux/cart/cart.manager';
import { ADD_TO_CART } from '../../../../redux/cart/cart.types';
import { ProductDetailView, ProductModelResponse } from '../../../../redux/product/product.d';
import { api_get_productDetail } from '../../../../redux/product/product.manager';
import { action } from '../../../../redux/store';
import ActiveLastBreadcrumb from '../../../shared/components/ActiveLastBreadcrumb';
import { Section, SectionHeader } from '../../../shared/components/Section';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';
import { sectionHeaderStyles, SectionStyles } from '../Styles';
import { HeaderFeatureStyles } from './Detail.styles';
import ProductMainFeature from './ProductMainFeature';
// import PricingSection from "./PricingSection";

const useStyles = makeStyles((theme: Theme) => ({
    description: {
        whiteSpace: 'pre-wrap',
    },
    sectionRoot: {
        background: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: "24px",
    },
    subtitleRating_wrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '4px',
    },
    subtitleRating_link: {
        textDecoration: 'none',
        marginLeft: '5px',
    },
    image: {
        objectFit: 'contain',
    },
    toolbar: {
        justifyContent: 'space-between',
    },
}));

const path = ['Home', 'Laptop', 'Laptop Gamming', 'ProductName'];
const href = ['/', '#', '#', '#'];

const SHOPs_SUMMARY = {
    shop01: {
        name: 'Shop 1',
        slogan: 'Chúng tôi cam kết hàng chĩnh hãng',
        warrantyTime: 'Bảo hành 3 tháng - 1 đổi 1 trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất',
    },
    shop02: {
        name: 'Shop 2',
        slogan: 'Chúng tôi cam kết hàng chĩnh hãng',
        warrantyTime: 'Bảo hành 3 tháng - 1 đổi 1 trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất',
    },
    shop03: {
        name: 'Shop 3',
        slogan: 'Chúng tôi cam kết hàng chĩnh hãng',
        warrantyTime: 'Bảo hành 3 tháng - 1 đổi 1 trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất',
    },
};
// type ProductDetailOptionType = typeof PRODUCT_DETAIL.options;
function getListPrice(options: OptionsType): number[] {
    return Object.keys(options)
        .map((k) => {
            const price = options[k as keyof typeof options].price;
            return price;
        })
        .filter((x) => x > 0);
}

function ProductDetail(props: { match: { params: { id: number } } }): JSX.Element {
    const classes = useStyles();
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    const [product, setPd] = useState<ProductDetailView | undefined>();
    const [model, selectModel] = useState<ProductModelResponse | undefined>();
    React.useEffect(() => {
        api_get_productDetail(props.match.params.id, setPd);
    }, []);
    React.useEffect(() => {
        if (product !== undefined && product?.variations.length == 0) {
            selectModel(product.models[0]);
            console.log(product.description);
        }
    }, [product]);
    const snackbar = useSnackbar();
    return (
        <main>
            <section>
                <ActiveLastBreadcrumb path={path} href={href} />
            </section>
            <ProductMainFeature
                product={product}
                buyQuantity={buyQuantity}
                setBuyQuantity={setBuyQuantity}
                selectedModel={model}
                selectModel={selectModel}
                onBuyClick={() => {
                    if (product !== undefined && model !== undefined){
                        action(ADD_TO_CART, p2cartItem(product, model, buyQuantity))
                        snackbar.info({ text: 'Added item to cart' }); 
                    } else {
                        snackbar.info({ text: 'Added item to cart fail' }); 
                    }
                }}
            />
            <section>
                <Typography variant="h5">Description</Typography>
            </section>
            {/* <Paper>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">Your Posts</Typography>
                    <Button variant="contained" color="secondary" disableElevation>
                        Add Post
                    </Button>
                </Toolbar>
                <Divider />
            </Paper> */}
            <Section classes={{ root: classes.sectionRoot }}>
                <Grid container item xs={12} md={12}>
                    <Typography className={classes.description}>{product?.description}</Typography>
                </Grid>
            </Section>
            {/* <Section classes={{ root: classes.sectionRoot }}>
                <SectionHeader
                    classes={sectionHeaderStyles()}
                    title="Description"
                    xs={12}
                    md={12}
                    variant="h5"
                ></SectionHeader>
            </Section> */}
        </main>
    );
}

ProductDetail.propTypes = {};

export default ProductDetail;

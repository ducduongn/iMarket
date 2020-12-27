import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, withStyles } from '@material-ui/core';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Section, BreackDrirectionGrid } from '../../../shared/components/Section';
import ProductSummary, { ProductSummaryProps, ProductSummarySkeleton } from './ProductSummary';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';
import { ProductDetailView, ProductModelResponse } from '../../../../redux/product/product.d';

const useStyles = makeStyles(() => ({
    sectionRoot: {
        background: '#ffffff',
        padding: '0px 16px',
        borderRadius: '8px',
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
}));
export type ProductMainFeatureProps = {
    product?: ProductDetailView;
    buyQuantity: number;
    setBuyQuantity: Dispatch<SetStateAction<number>>;
} & {
    selectedModel: ProductModelResponse | undefined;
    selectModel: Dispatch<SetStateAction<ProductModelResponse | undefined>>;
};

function ProductMainFeature(props: ProductMainFeatureProps): JSX.Element {
    const { product, buyQuantity, setBuyQuantity, selectedModel, selectModel } = props;
    const classes = useStyles();
    const loading = product == undefined;
    return (
        <Section classes={{ root: classes.sectionRoot }}>
            <BreackDrirectionGrid direction2="column">
                <Grid container item xs={12} md={5}>
                    {loading ? (
                        <Skeleton variant="rect" width="100%" height="800px">
                            <div style={{ paddingTop: '57%' }} />
                        </Skeleton>
                    ) : (
                        <LazyLoadImage
                            className={classNames('block', 'fullSize', classes.image)}
                            src={product?.image}
                            effect="blur"
                        />
                    )}
                </Grid>
                {loading ? (
                    <ProductSummarySkeleton />
                ) : (
                    <ProductSummary
                        {...(product as ProductDetailView)}
                        buyQuantity={buyQuantity}
                        setBuyQuantity={setBuyQuantity}
                        selectedModel={selectedModel}
                        selectModel={selectModel}
                    />
                )}
            </BreackDrirectionGrid>
        </Section>
    );
}

export default ProductMainFeature;

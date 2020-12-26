import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, withStyles } from '@material-ui/core';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Section, BreackDrirectionGrid } from '../../../shared/components/Section';
import ProductSummary, { ProductSummaryProps } from './ProductSummary';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classNames from 'classnames';

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
export type ProductMainFeatureProps<T extends string> = ProductSummaryProps<T>;
function ProductMainFeature<T extends string>(props: ProductMainFeatureProps<T>): JSX.Element {
    const classes = useStyles();
    const { ...productMainFeatures } = props;
    return (
        <Section classes={{ root: classes.sectionRoot }}>
            <BreackDrirectionGrid direction2="column">
                <Grid container item xs={12} md={5}>
                    <LazyLoadImage
                        className={classNames('block', 'fullSize', classes.image)}
                        src={`${process.env.PUBLIC_URL}/assets/images/products/laptop02.png`}
                        effect="blur"
                    />
                </Grid>
                <ProductSummary {...productMainFeatures} />
            </BreackDrirectionGrid>
        </Section>
    );
}

export default ProductMainFeature;

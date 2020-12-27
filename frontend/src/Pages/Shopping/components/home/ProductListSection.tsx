import React from 'react';
import classNames from 'classnames';
import { Grid, Typography, Card, withStyles, CardMedia, CardContent, createStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Section, SectionHeader } from '../../../shared/components/Section';
import { sectionHeaderStyles, SectionStyles } from '../Styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import PriceFeature from '../shared/PriceFeature';
import { Link } from 'react-router-dom';
import { ProductCardView } from '../../../../redux/product/product.d';
import { PRODUCT_LIST } from '../../../../objects/ProductDetail';
import { Skeleton } from '@material-ui/lab';

const productCardStyle = () =>
    createStyles({
        root: {
            boxShadow: 'none',
            borderRadius: '16px',
            '&:hover': {
                boxShadow: '0 6px 15px 0 rgba(0, 0, 0, 0.2)',
            },
            '&:hover card-image': {
                borderRadius: '0px',
            },
        },
        productImage: {
            height: '200px',
            // width: '200px',
            padding: '24px 24px 0 24px',
            position: 'relative',
            background: '#e8eaf6',
            borderRadius: '16px',
        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            height: '44.8167px',
            // justifyContent: 'space-between',
        },
        rating: {
            paddingBottom: '16px',
        },
    });

export type ProductCardProps = { classes: ClassNameMap<string> } & ProductCardView;
export const ProductCard = withStyles(productCardStyle)(
    ({ itemid, classes, name, image, price, rating_star, oldprice }: ProductCardProps): JSX.Element => {
        return (
            <Card className={classes.root} color="secondary">
                {/* <CardActionArea> */}
                <Link to={`/detail/${itemid}`}>
                    <CardMedia className={classNames(classes.productImage, 'card-image')}>
                        <LazyLoadImage
                            className={classNames('block', 'fitContain', 'fullSize')}
                            width="100%"
                            height="100%"
                            src={image}
                            effect="blur"
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h6" noWrap>
                            {name}
                        </Typography>
                        <Rating precision={0.1} className={classes.rating} readOnly value={rating_star} size="small" />
                        <div className={classes.contentWrapper}>
                            <PriceFeature card price={price} comparePrice={oldprice} unit="₫" />
                        </div>
                    </CardContent>
                </Link>

                {/* </CardActionArea> */}
            </Card>
        );
    },
);

export const ProductCartSkeleton = withStyles(productCardStyle)(
    ({ classes }: { classes: ClassNameMap<string> }): JSX.Element => {
        const { itemid, name, image, price, oldprice } = PRODUCT_LIST[0];
        return (
            <Card className={classes.root} color="secondary">
                {/* <CardActionArea> */}
                <Link to={`/detail/${itemid}`}>
                    <CardMedia className={classNames(classes.productImage, 'card-image')}>
                        <Skeleton width="100%" height="100%" />
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h6" noWrap>
                            <Skeleton />
                        </Typography>
                        <Skeleton>
                            <Rating className={classes.rating} readOnly value={4} size="small" />
                        </Skeleton>
                        <div className={classes.contentWrapper}>
                            <Skeleton>
                                <PriceFeature card price={price} comparePrice={oldprice} unit="₫" />
                            </Skeleton>
                        </div>
                    </CardContent>
                </Link>

                {/* </CardActionArea> */}
            </Card>
        );
    },
);

function ProductListSection(props: { title: string; productList: Array<ProductCardView> }): JSX.Element {
    const { title, productList } = props;
    return (
        <Section classes={SectionStyles()}>
            <SectionHeader classes={sectionHeaderStyles()} xs={12} md={12} title={title} variant="h5">
                {/* <SectionHeaderSubtile variant="h6" text="." /> */}
            </SectionHeader>
            <Grid container spacing={2}>
                {productList.map((p, i) => {
                    return (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3} data-aos="fade-up">
                            <ProductCard {...p} />
                        </Grid>
                    );
                })}
            </Grid>
        </Section>
    );
}
export default ProductListSection;

import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Button, Grid, Paper, Typography, Chip, Link, Hidden, ButtonProps } from '@material-ui/core';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NumberPlusMinus from '../../../shared/components/NumberPlusMinus';
import FeatureSubSection from './FeatureSubSection';
import { PriceFeatureStyles, HeaderFeatureStyles, PromotionStyles } from './Detail.styles';
import Rating from '@material-ui/lab/Rating';
import ShopSummary, { ShopSummaryProps } from './ShopSummary';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import PriceFeature, { PriceProps } from '../shared/PriceFeature';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';
import { Skeleton } from '@material-ui/lab';
import {
    ProductDetailView,
    ProductModelResponse,
    TierVariantResponse,
    TierVariation,
} from '../../../../redux/product/product.d';
import { tierInd2model } from '../../../../redux/product/product.manager';
import { action } from '../../../../redux/store';
import { ADD_TO_CART } from '../../../../redux/cart/cart.types';
import { p2cartItem } from '../../../../redux/cart/cart.manager';

interface HeaderProps {
    name: string;
    rating: number;
    brand: string;
    numRating: number;
}

function HeaderFeature(props: HeaderProps) {
    const classes = HeaderFeatureStyles();
    const { name, rating, brand, numRating } = props;
    console.log(numRating);
    return (
        <Fragment>
            <div className={classes.brand}>
                <Chip size="small" label="bán chạy" color="secondary" />
            </div>
            <Typography className={classes.title} variant="h5">
                {name}
            </Typography>
            <div className={classes.subtitleRating_wrapper}>
                <Rating readOnly value={rating} size="small" />
                <Link className={classes.subtitleRating_link}>
                    <Typography variant="subtitle2">(xem {numRating} đánh giá)</Typography>
                </Link>
            </div>
            <div className={classes.brand}>
                <Typography>
                    Thương hiệu: <Link>{brand}</Link>
                </Typography>
            </div>
        </Fragment>
    );
}

type OptionSelectionProps = {
    variation: TierVariantResponse;
    options: Array<number>;
    setOption: Dispatch<SetStateAction<number[]>>;
};
function OptionSelectionFeature(props: OptionSelectionProps) {
    const { variation, options, setOption } = props;
    React.useEffect(() => {
        console.log('newOption');
        console.log(options[variation.order_in_tier]);
    }, [options]);

    const handleOption = (event: React.MouseEvent<HTMLElement>, newOption: number | null) => {
        if (newOption === null) {
            newOption = -1;
        }
        const newOptions = [...options];
        newOptions[variation.order_in_tier] = newOption;
        setOption(newOptions);
    };
    return (
        <FeatureSubSection title={variation.name}>
            <ToggleButtonGroup
                value={options[variation.order_in_tier]}
                exclusive
                size="small"
                onChange={handleOption}
                aria-label="text alignment"
            >
                {variation.options.map((text, i) => (
                    <ToggleButton key={i} value={i}>
                        {text}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </FeatureSubSection>
    );
}

type QuantitySelectionFeatureProps = {
    buyQuantity: number;
    availableQuantity: number;
    setBuyQuantity: Dispatch<SetStateAction<number>>;
};
function QuantitySelectionFeature(props: QuantitySelectionFeatureProps) {
    const { buyQuantity, availableQuantity, setBuyQuantity } = props;

    const text = availableQuantity >= 0 ? `Còn ${availableQuantity} sản phẩm` : `Vui lòng chọn loại sản phẩm`;
    return (
        <FeatureSubSection title="Số lượng" grid>
            <Grid item xs={6}>
                <NumberPlusMinus value={buyQuantity} setValue={setBuyQuantity} min={1} max={availableQuantity} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle2" align="right">
                    {text}
                </Typography>
            </Grid>
        </FeatureSubSection>
    );
}

function Promotion(): JSX.Element {
    const classes = PromotionStyles();

    return (
        <FeatureSubSection title="2 Mã giảm giá">
            <Button className={classes.coupon}>Giảm 5%</Button>
            <Button className={classes.coupon}>Giảm 10%</Button>
        </FeatureSubSection>
    );
}

const AddressInput = (): JSX.Element => {
    return (
        <FeatureSubSection>
            <Typography variant="subtitle2">
                Bạn hãy <span>NHẬP ĐỊA CHỈ</span> nhận hàng để được dự báo thời gian & chi phí giao hàng một cách chính
                xác nhất.
            </Typography>
        </FeatureSubSection>
    );
};

const BuyButton = (props: { availableQuantity?: number } & ButtonProps) => {
    const { availableQuantity, ...buttonProps } = props;
    return (
        <div className="pad-top-divider">
            <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                disabled={availableQuantity == undefined || availableQuantity <= 0}
                {...buttonProps}
            >
                Chọn mua ngay
            </Button>
        </div>
    );
};
export type ProductSummaryProps = ProductDetailView & {
    selectedModel: ProductModelResponse | undefined;
    selectModel: Dispatch<SetStateAction<ProductModelResponse | undefined>>;
    onBuyClick: () => unknown;
} & Omit<QuantitySelectionFeatureProps, 'availableQuantity'>;
export default function ProductSummary(props: ProductSummaryProps): JSX.Element {
    const {
        name,
        brand,
        rating,
        oldprice,
        models,
        variations,
        selectedModel,
        selectModel,
        buyQuantity,
        setBuyQuantity,
        onBuyClick,
    } = props;
    const [options, setOptions] = useState<number[]>([]);
    const prices = models.map((m) => m.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const snackbar = useSnackbar();
    React.useEffect(() => {
        if (options.find((v) => v == -1) === undefined) {
            selectModel(tierInd2model(options, models));
        } else {
            selectModel(undefined);
        }
    }, [options]);
    return (
        <Grid item xs={12} md={7} container spacing={1}>
            <Grid item xs={12}>
                <HeaderFeature
                    name={name}
                    rating={rating.rating_star}
                    numRating={rating.rating_count.reduce((a, b) => a + b)}
                    brand={brand}
                />
            </Grid>
            <Grid container item xs={12} md={12} lg={7}>
                <Grid item xs={12}>
                    <Paper className={PriceFeatureStyles().root} elevation={0}>
                        <PriceFeature
                            price={selectedModel ? selectedModel.price : minPrice}
                            comparePrice={oldprice}
                            unit={'VND'}
                            maxPrice={selectedModel == undefined ? maxPrice : undefined}
                        />
                    </Paper>
                    {variations.length > 0 &&
                        variations.map((v, ind) => (
                            <OptionSelectionFeature key={ind} variation={v} options={options} setOption={setOptions} />
                        ))}
                    <Promotion />
                    <AddressInput />
                    <QuantitySelectionFeature
                        buyQuantity={buyQuantity}
                        setBuyQuantity={setBuyQuantity}
                        availableQuantity={selectedModel ? selectedModel.stock : -1}
                    />
                    <BuyButton
                        onClick={onBuyClick}
                        availableQuantity={selectedModel ? selectedModel.stock : undefined}
                    />
                </Grid>
            </Grid>
            {/* <Hidden mdDown>
                <Grid container item xs={12} lg={5}>
                    <ShopSummary {...shopProps} />
                </Grid>
            </Hidden> */}
        </Grid>
    );
}

function QuantitySelectionSkeleton() {
    return (
        <Skeleton>
            <FeatureSubSection title="Số lượng" grid>
                <Grid item xs={6}>
                    <NumberPlusMinus value={1} min={0} max={2} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle2" align="right">
                        {`Vui lòng chọn loại sản phẩm`}
                    </Typography>
                </Grid>
            </FeatureSubSection>
        </Skeleton>
    );
}

export function ProductSummarySkeleton(): JSX.Element {
    return (
        <Grid item xs={12} md={7} container spacing={1}>
            <Grid item xs={12}>
                <Skeleton width="100%">
                    <HeaderFeature name={''} rating={0} numRating={0} brand="MSI" />
                </Skeleton>
            </Grid>
            <Grid container item xs={12} md={12} lg={7}>
                <Grid item xs={12}>
                    <Paper className={PriceFeatureStyles().root} elevation={0}>
                        <Skeleton width="100%">
                            <PriceFeature price={10000} comparePrice={10000} unit={'d'} maxPrice={10000} />
                        </Skeleton>
                    </Paper>
                    {/* {optionProps && optionProps.map((v, ind) => <OptionSelectionFeature key={ind} {...v} />)} */}
                    <Skeleton>{<Promotion />}</Skeleton>
                    <Skeleton>
                        <AddressInput />
                    </Skeleton>
                    <QuantitySelectionSkeleton />
                    <Skeleton>
                        <BuyButton />
                    </Skeleton>
                </Grid>
            </Grid>
            {/* <Hidden mdDown>
                <Grid container item xs={12} lg={5}>
                    <ShopSummary {...shopProps} />
                </Grid>
            </Hidden> */}
        </Grid>
    );
}

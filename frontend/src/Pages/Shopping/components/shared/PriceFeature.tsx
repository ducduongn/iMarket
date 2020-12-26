import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { numberWithCommas } from '../../../../utils';

export interface PriceProps {
    price: number;
    maxPrice?: number;
    comparePrice?: number;
    unit: string;
    card?: boolean;
}
export default function PriceFeature(props: PriceProps): JSX.Element {
    const { price, comparePrice, unit, card, maxPrice } = props;
    let discountPercent = undefined;
    if (comparePrice !== undefined && comparePrice > price) {
        discountPercent = Math.round(((comparePrice - price) * 100) / comparePrice);
    }
    const small = card || maxPrice;
    const percentMargin = small ? 4 : 8;
    const mainVariant = small ? 'h5' : 'h4';
    const subVariant = small ? 'h6' : 'h5';
    const priceText =
        numberWithCommas(price) + ' ' + unit + (maxPrice ? ' - ' + numberWithCommas(maxPrice) + ' ' + unit : '');
    return (
        <Fragment>
            <Typography color="primary" variant={mainVariant}>
                {priceText}
                {discountPercent && (
                    <Typography
                        variant={subVariant}
                        color="secondary"
                        style={{ lineHeight: '1.6', marginLeft: `${percentMargin}px`, display: 'inline' }}
                    >
                        -{discountPercent} %
                    </Typography>
                )}
            </Typography>
            {discountPercent && comparePrice !== undefined && (
                <Typography variant={subVariant}>
                    <s>{numberWithCommas(comparePrice) + ' ' + unit}</s>
                </Typography>
            )}
        </Fragment>
    );
}

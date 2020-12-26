import { makeStyles } from '@material-ui/core';

export const HeaderFeatureStyles = makeStyles(() => ({
    brand: {
        display: 'flex',
        marginTop: '8px',
    },
    title: {
        marginTop: '8px',
    },
    subtitleRating_wrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2px',
    },
    subtitleRating_link: {
        marginLeft: '5px',
        cursor: 'pointer',
    },
}));

export const PriceFeatureStyles = makeStyles((theme) => ({
    root: {
        background: '#fafafa',
        padding: '12px 16px',
        margin: '24px 0px',
        borderRadius: '8px',
    },
}));

export const PromotionStyles = makeStyles(() => ({
    coupon_tags: {
        display: 'flex',
        padding: '0 4px 0 0',
        flexWrap: 'wrap',
    },
    discountContainter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginTop: '16px',
        '& .discount-text': {
            fontWeight: 800,
        },
    },
    coupon: {
        borderRadius: '4px',
        margin: '8px 12px 0px 0px',
        padding: '3px 12px',
        color: 'rgb(13, 92, 182)',
        border: '1px solid rgb(13, 92, 182)',
        '&::before,&::after': {
            content: '""',
            width: '10px',
            height: '10px',
            background: '#ffffff',
            border: '1px solid',
            borderColor: 'transparent rgb(13, 92, 182) rgb(13, 92, 182) transparent',
            borderImage: 'none 100% / 1 / 0  stretch',
            position: 'absolute',
            borderRadius: '50%',
            marginTop: '5px',
        },
        '&::before': {
            left: '-6px',
            transform: 'rotate(-45deg)',
        },
        '&::after': {
            right: '-6px',
            transform: 'rotate(135deg)',
        },
    },
}));

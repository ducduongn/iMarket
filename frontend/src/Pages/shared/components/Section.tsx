import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Grid,
    Typography,
    Button,
    withWidth,
    isWidthUp,
    GridProps,
    WithWidthProps,
    WithWidthOptions,
    TypographyProps,
    ButtonProps,
    GridDirection,
    WithWidth,
} from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { CommonProps } from '@material-ui/core/OverridableComponent';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

type SectionProps = { classes?: ClassNameMap<string>; aos?: boolean; children?: React.ReactNode };

type SectionHeaderSubtileProps = SectionProps & { text: string; is_price: boolean } & TypographyProps;
export const SectionHeaderSubtile = (props: SectionHeaderSubtileProps): JSX.Element => {
    const { classes, text, align, variant, is_price } = props;
    return (
        <Grid className={classes && classes.root} item xs={12}>
            <Typography className={classes && classes.text} variant={variant} color="textSecondary" align={align}>
                {is_price ? <span className={classes && classes.price}>{text}</span> : text}
            </Typography>
        </Grid>
    );
};

SectionHeaderSubtile.defaultProps = {
    align: 'left',
    variant: 'h6',
    is_price: false,
    textClass: '',
};

export const SectionHeaderCta = (props: SectionProps & ButtonProps): JSX.Element => {
    const { classes, children, color } = props;
    return (
        <Grid item xs={12}>
            <Grid container alignItems="center">
                <div className={classes && classes.wrapper}>
                    <Button variant="contained" size="large" color={color || 'primary'}>
                        {children}
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export const SectionHeaderNote = (props: SectionProps): JSX.Element => {
    const { classes, aos, children } = props;
    return (
        <div data-aos={aos && 'fade-up'}>
            <div className={classes && classes.root}>
                <Typography variant="subtitle1" color="textSecondary" align="left">
                    {children}
                </Typography>
            </div>
        </div>
    );
};

type SectionHeaderProps = SectionProps &
    Omit<GridProps, 'children'> & {
        title: string;
        children?: React.ReactNode;
        subtitle?: React.ReactNode;
        note?: React.ReactNode;
    } & TypographyProps;
export const SectionHeader = (props: SectionHeaderProps): JSX.Element => {
    const { classes, title, subtitle, note, children, xs, md, aos, ...others } = props;
    return (
        <Grid
            item
            xs={xs}
            md={md}
            data-aos={aos && 'fade-up'}
            container
            // spacing={2}
            className={classes && classes.root}
        >
            {/* <Grid container className={classes && classes.root} spacing={2} data-aos="fade-up"> */}
            <Grid className={classes && classes.titleWraper} item xs={12}>
                <Typography className={classes && classes.title} {...others}>
                    {title}
                </Typography>
                {subtitle}
            </Grid>
            {children}
            {/* </Grid> */}
            {note}
        </Grid>
    );
};

SectionHeader.defaultProps = {
    align: 'left',
    variant: 'h3',
    color: 'textPrimary',
    xs: 12,
    md: 6,
    titleClass: '',
};

SectionHeader.prototype = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    align: PropTypes.string,
    variant: PropTypes.string,
    note: PropTypes.object,
};

export const BreackDrirectionGrid = withWidth()(
    (
        props: {
            breakpoint?: Breakpoint;
            direction1?: GridDirection;
            direction2?: GridDirection;
        } & GridProps &
            WithWidth,
    ) => {
        const {
            breakpoint = 'sm',
            width,
            direction1 = 'row',
            direction2 = 'column-reverse',
            children,
            ...others
        } = props;
        console.log(breakpoint);
        console.log(width);
        console.log(isWidthUp(breakpoint, width));
        console.log(direction1);
        return (
            <Grid
                direction={isWidthUp(breakpoint, width) ? direction1 : direction2}
                container
                spacing={2}
                justify="space-between"
                {...others}
            >
                {children}
            </Grid>
        );
    },
);

export const SectionImage = (props: SectionProps & GridProps): JSX.Element => {
    const { classes, aos, xs = 12, md = 6, ...others } = props;
    return (
        <Grid container item xs={xs} md={md} {...others} data-aos={aos && 'fade-up'}>
            <LazyLoadImage
                className={classNames('block', 'fullSize', classes && classes.featureImage)}
                alt="Headphones"
                src={`${process.env.PUBLIC_URL}/assets/images/products/laptop02.png`}
                effect="blur"
            />
        </Grid>
    );
};

export function Section(props: SectionProps): JSX.Element {
    const { classes, children } = props;
    return (
        <section className={classes && classes.root}>
            <div className={classes && classes.wrapper}>{children}</div>
        </section>
    );
}

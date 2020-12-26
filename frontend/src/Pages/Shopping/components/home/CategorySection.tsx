import React from 'react';
import PropTypes from 'prop-types';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Section, SectionHeader } from '../../../shared/components/Section';
import { Card, CardContent, Grid, Typography, withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classNames from 'classnames';
import { SectionStyles } from '../Styles';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
    createStyles({
        wrapper: {},
        card: {
            background: 'rgb(247, 249, 250)',
            borderRadius: '16px',
        },

        cardContent: {
            '&:last-child': {
                padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
            },
        },

        cardImage: {
            width: '60px',
            height: '60px',
            objectFit: 'contain',
            marginBottom: '40px',
        },
    });

const CategoryCard = withStyles(styles)((props: { name: string; imageSrc: string } & WithStyles<typeof styles>) => {
    const { classes, name, imageSrc } = props;
    return (
        <Card
            className={classNames('no-shadow', 'no-border', 'fullSize', 'floatHover', classes.card)}
            elevation={1}
            raised
        >
            <Link to="/browse">
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid container item justify="center" xs={12}>
                            <LazyLoadImage
                                className={classNames(classes.cardImage, 'block', 'fullSize')}
                                effect="opacity"
                                alt={name}
                                src={imageSrc}
                                width="auto"
                                height="auto"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" color="textPrimary">
                                {name}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Link>
        </Card>
    );
});

const CATELIST = {
    Headphone: 'https://thefront.maccarianagency.com/assets/images/illustrations/icon-headphone.png',
    Notebooks: 'https://thefront.maccarianagency.com/assets/images/illustrations/icon-laptop.png',
};

function CategorySection(): JSX.Element {
    return (
        <Section classes={SectionStyles()}>
            <SectionHeader title="Categories" variant="h4" />
            <Grid container spacing={2}>
                {Object.entries(CATELIST).map((i) => {
                    const [k, v] = i;
                    return (
                        <Grid key={k} item xs={6} md={2} data-aos="fade-up">
                            <CategoryCard name={k} imageSrc={v} />
                        </Grid>
                    );
                })}
            </Grid>
        </Section>
    );
}

export default CategorySection;

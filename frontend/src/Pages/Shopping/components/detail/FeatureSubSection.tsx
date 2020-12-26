import React from 'react';
import { makeStyles, Typography, Grid, createStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            display: 'flex',
            padding: '8px 12px 0 8px',
            flexWrap: 'wrap',
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            marginTop: '16px',
        },
    }),
);

interface Props {
    children: Array<JSX.Element> | JSX.Element;
    title?: string;
    grid?: boolean;
}

export default function FeatureSubSection(props: Props): JSX.Element {
    const classes = useStyles();
    const { title, grid, children } = props;
    return (
        <div className={classNames('top-divider')}>
            <div className={classes.wrapper}>
                {title && (
                    <Typography className="boldText" variant="h6">
                        {title}
                    </Typography>
                )}
                {grid ? (
                    <Grid className={classes.content} container alignContent="space-between" alignItems="center">
                        {children}
                    </Grid>
                ) : (
                    <div className={classes.content}>{children}</div>
                )}
            </div>
        </div>
    );
}

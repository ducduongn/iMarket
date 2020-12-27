import { Box, Button, Grid, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import { ArrowDropDown, ViewList, ViewModule } from '@material-ui/icons';
import { Pagination, Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { PRODUCT_LIST } from '../../../../objects/ProductDetail';
import { ProductCardView } from '../../../../redux/product/product.d';
import { ProductCard, ProductCartSkeleton } from '../home/ProductListSection';
import { OrderField } from './Browse.page';

const headerStyles = makeStyles(() => ({
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '16px',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        position: 'relative',
        '&::after': {
            content: '" "',
            left: 0,
            width: '48px',
            bottom: '-8px',
            height: '3px',
            position: 'absolute',
            backgroundColor: '#3949ab',
        },
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
    },
    sortButton: {
        marginRight: '16px',
        letterSpacing: 0,
    },
}));
type HeaderProps = {
    view: string;
    setView: Dispatch<SetStateAction<string>>;
    SORT: string[];
    ordering: number;
    setOrdering: Dispatch<SetStateAction<number>>;
};
function Header(props: HeaderProps): JSX.Element {
    const classes = headerStyles();
    const { view, setView, SORT, ordering, setOrdering } = props;
    const handleViewChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (i: number) => () => {
        if (i >= 0) {
            setOrdering(i);
        }
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box className={classes.header}>
            <Typography className={classes.headerText} variant="h5">
                Showing 6 projects
            </Typography>
            <Box className={classes.headerRight}>
                <Button className={classes.sortButton} onClick={handleClick} size="small">
                    {SORT[ordering]}
                    <ArrowDropDown fontSize="small" />
                </Button>
                <Menu
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose(-1)}
                    // anchorOrigin={{
                    //     vertical: 'bottom',
                    //     horizontal: 'center',
                    // }}
                    // transformOrigin={{
                    //     vertical: 'top',
                    //     horizontal: 'center',
                    // }}
                >
                    {SORT.map((v, i) => (
                        <MenuItem key={i} onClick={handleClose(i)}>
                            {v}
                        </MenuItem>
                    ))}
                </Menu>
                <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} size="small">
                    <ToggleButton value="list" aria-label="list">
                        <ViewList />
                    </ToggleButton>
                    <ToggleButton value="module" aria-label="module">
                        <ViewModule />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
}

const useStyles = makeStyles({
    pagination: {
        display: 'flex',
        marginTop: '48px',
        justifyContent: 'center',
    },
});
function ItemFilterResult(
    props: {
        loading: boolean;
        count?: number;
        productList?: ProductCardView[];
        fetchNewPage: (limit: number, offset: number) => void;
    } & Omit<HeaderProps, 'view' | 'setView'>,
): JSX.Element {
    const { loading, productList, count = 0, fetchNewPage, SORT, ordering, setOrdering } = props;
    // const loading = productList == undefined;
    const classes = useStyles();
    const [view, setView] = React.useState('module');
    const md = view == 'list' ? 4 : 3;
    const lg = view == 'list' ? 4 : 3;
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        fetchNewPage(8, (value - 1) * 8);
    };

    return (
        <Box>
            <div>
                <Header {...{ view, setView, SORT, ordering, setOrdering }} />
                <Grid container spacing={3}>
                    {loading
                        ? new Array(8).fill(1).map((v, i) => (
                              <Grid key={i} item xs={12} md={md} lg={lg}>
                                  <ProductCartSkeleton />
                              </Grid>
                          ))
                        : (productList as ProductCardView[]).map((v) => (
                              <Grid key={v.name} item xs={12} md={md} lg={lg}>
                                  <ProductCard {...v} />;
                              </Grid>
                          ))}
                </Grid>
                <Box className={classes.pagination}>
                    <Pagination count={Math.round(count / 8)} page={page} onChange={handlePageChange} />
                </Box>
            </div>
        </Box>
    );
}

export default ItemFilterResult;

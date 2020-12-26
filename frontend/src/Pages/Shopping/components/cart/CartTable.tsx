import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationDialog from '../../../shared/components/ConfirmationDialog';

import { RowItemType, CartTypes } from './Cart.d';

import { createTableData, deleteTableDataByRow, deleteTableDataByModelIds } from './utils';
import { Grid } from '@material-ui/core';
import ShopSectionTable from './CartTable/ShopSectionTable';
import { getShopOrder } from '../../../../api/order';
import { useSnackbar } from '../../../shared/components/SnackbarProvider';

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'overview', numeric: false, disablePadding: true, label: 'Sản phẩm' },
    // { id: 'variation', numeric: false, disablePadding: true, label: 'Phân loại' },
    { id: 'unit_price', numeric: true, disablePadding: false, label: 'Đơn giá' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Số lượng' },
    { id: 'total_price', numeric: true, disablePadding: false, label: 'Số tiền' },
    { id: 'action', numeric: true, disablePadding: false, label: '' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        className={classes[('cell_' + headCell.id) as keyof ReturnType<typeof useStyles>]}
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                      color: theme.palette.secondary.main,
                      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark,
                  },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    handleDeleteSelected: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, handleDeleteSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Giỏ hàng
                </Typography>
            )}

            <Tooltip title="Delete">
                <IconButton disabled={numSelected <= 0} aria-label="delete" onClick={handleDeleteSelected}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            marginBottom: theme.spacing(2),
        },
        tableContainer: {
            overflow: 'hidden',
        },
        table: {
            minWidth: 750,
        },
        cell_overview: {
            // display: 'flex',
            // width: '46.27949%',
        },
        row: {
            // '&:nth-of-type(odd)': {
            //     backgroundColor: theme.palette.action.hover,
            // },
        },
        cell_unit_price: {
            width: '15.88022%',
        },
        cell_quantity: {
            width: '15.4265%',
        },
        cell_total_price: {
            width: '10.43557%',
        },
        cell_action: {
            width: '8.70417%',
        },
        blackIcon: {
            color: theme.palette.common.black,
        },
    }),
);
export type TableStylesType = ReturnType<typeof useStyles>;
export default function CartTable(props: {
    data: CartTypes;
    setData: Dispatch<SetStateAction<CartTypes>>;
}): JSX.Element {
    const classes = useStyles();
    const { data, setData } = props;
    const [selected, setSelected] = React.useState<Set<number>>(new Set<number>());
    // const [data, setData] = React.useState<CartTypes>([]);
    const [isDeleteTargetDialogOpen, setIsDeleteTargetDialogOpen] = useState(false);
    const [deleteRow, setDeleteTargetDialogRow] = useState<RowItemType | undefined>();
    const [isDeleteTargetLoading, setIsDeleteTargetLoading] = useState<boolean>(false);
    const rowCount = React.useRef<number>(0);
    const snackbar = useSnackbar();
    React.useEffect(() => {
        rowCount.current = 0;
        if (data) {
            data.map((s) => {
                rowCount.current += s.items.length;
            });
        }
    }, [data]);

    const deleteTarget = useCallback(() => {
        setIsDeleteTargetLoading(true);
        setTimeout(() => {
            setIsDeleteTargetDialogOpen(false);
            setIsDeleteTargetLoading(false);
            const deleteResponse = deleteRow
                ? deleteTableDataByRow(data, deleteRow)
                : deleteTableDataByModelIds(data, selected);
            if (deleteResponse.success) {
                if (deleteRow) {
                    snackbar.info({
                        text: 'Sản phẩm đã được xóa khỏi giỏ hàng',
                    });
                } else {
                    snackbar.info({
                        text: `${selected.size} sản phẩm đã được xóa khỏi giỏ hàng`,
                    });
                    setSelected(new Set());
                }
            } else {
                snackbar.info({
                    text: 'Thao tác xóa khỏi giỏ hàng không thành công',
                });
            }
            setData(deleteResponse.tableData);
        }, 1500);
    }, [selected, setIsDeleteTargetDialogOpen, setIsDeleteTargetLoading, snackbar, deleteRow, data]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected = new Set(selected);
        if (event.target.checked) {
            data.map((s) => s.items.map((i) => newSelected.add(i.modelid)));
        } else {
            data.map((s) => s.items.map((i) => newSelected.delete(i.modelid)));
        }
        setSelected(newSelected);
    };
    const handleDeleteSelected = useCallback(() => {
        setIsDeleteTargetDialogOpen(true);
        setDeleteTargetDialogRow(undefined);
    }, [setIsDeleteTargetDialogOpen, setDeleteTargetDialogRow]);
    const handleDeleteTargetDialogClose = useCallback(() => {
        setIsDeleteTargetDialogOpen(false);
        setDeleteTargetDialogRow(undefined);
    }, [setIsDeleteTargetDialogOpen]);
    const handleDeleteTargetDialogOpen = useCallback(
        (row: RowItemType) => {
            setIsDeleteTargetDialogOpen(true);
            setDeleteTargetDialogRow(row);
        },
        [setIsDeleteTargetDialogOpen, setDeleteTargetDialogRow],
    );
    return (
        <div className={classes.root}>
            <ConfirmationDialog
                open={isDeleteTargetDialogOpen}
                title="Confirmation"
                content={
                    deleteRow ? (
                        <span>
                            {'Bạn thực sự muốn xóa sản phẩm '}
                            <b>{deleteRow.name}</b>
                            {' khỏi giỏ hàng?'}
                        </span>
                    ) : (
                        <span>{`Bạn thực sự muốn xóa ${selected.size} sản phẩm khỏi giỏ hàng?`}</span>
                    )
                }
                onClose={handleDeleteTargetDialogClose}
                onConfirm={deleteTarget}
                loading={isDeleteTargetLoading}
            />
            {data && (
                <Paper className={classes.paper} elevation={0}>
                    <TableContainer className={classes.tableContainer}>
                        <Grid container direction="column" spacing={4}>
                            <Grid item xs={12}>
                                <Paper>
                                    <EnhancedTableToolbar
                                        numSelected={selected.size}
                                        handleDeleteSelected={handleDeleteSelected}
                                    />

                                    <Table
                                        className={classes.table}
                                        aria-labelledby="tableTitle"
                                        aria-label="enhanced table"
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            numSelected={selected.size}
                                            rowCount={rowCount.current}
                                            onSelectAllClick={handleSelectAllClick}
                                        />
                                    </Table>
                                </Paper>
                            </Grid>
                            {data.map((shop) => (
                                <Grid item xs={12} key={shop.shop.shopName}>
                                    <Paper>
                                        <ShopSectionTable
                                            selected={selected}
                                            setSelected={setSelected}
                                            classes={classes}
                                            rows={shop.items}
                                            shopName={shop.shop.shopName}
                                            handleDeleteTargetDialogOpen={handleDeleteTargetDialogOpen}
                                        />
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </TableContainer>
                </Paper>
            )}
        </div>
    );
}

import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { RowItemType } from '../Cart.d';
import { TableStylesType } from '../CartTable';
import { Avatar, Box, Button, IconButton } from '@material-ui/core';
import { numberWithCommas } from '../../../../../utils';
import GroupedButtons from '../../../../shared/components/NumberPlusMinus';
import { Delete } from '@material-ui/icons';

interface EnhancedTableProps {
    classes: TableStylesType;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}
const useShopSectionTableHeadStyles = makeStyles((theme: Theme) => ({
    row: {
        borderBottom: '1px solid rgba(0,0,0,.09)',
    },
    shopCell: {
        display: 'flex',
        alignItems: 'center',
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    shopName: {
        marginLeft: theme.spacing(1),
    },
}));
function ShopSectionTableHead(props: EnhancedTableProps & { shopName: string }) {
    const classes = useShopSectionTableHeadStyles();
    const { onSelectAllClick, numSelected, rowCount, shopName } = props;
    return (
        <TableHead>
            <TableRow className={classes.row}>
                <TableCell className="no-border" padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all product shop' }}
                    />
                </TableCell>
                <TableCell className="no-border" align="left" padding="none">
                    <Button className={classes.shopCell}>
                        <Avatar className={classes.smallAvatar} />
                        <Box className={classes.shopName}>{shopName}</Box>
                    </Button>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

interface ShopSectionTableProps {
    classes: TableStylesType;
    rows: Array<RowItemType>;
    handleDeleteTargetDialogOpen: (row: RowItemType) => void;
    shopName: string;
    selected: Set<number>;
    setSelected: Dispatch<SetStateAction<Set<number>>>;
}
export default function StoreSectionTable(props: ShopSectionTableProps): JSX.Element {
    const { classes, rows, shopName, handleDeleteTargetDialogOpen, selected, setSelected } = props;
    const [numSelected, setNumSelected] = React.useState<number>(0);

    React.useEffect(() => {
        let count = 0;
        rows.map((i) => {
            if (selected.has(i.modelid)) count += 1;
        });
        setNumSelected(count);
    }, [selected]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected = new Set(selected);
        let count = numSelected;
        if (event.target.checked) {
            rows.map((i) => {
                if (!newSelected.has(i.modelid)) {
                    count += 1;
                    newSelected.add(i.modelid);
                }
            });
        } else {
            rows.map((i) => newSelected.delete(i.modelid));
            count = 0;
        }
        setNumSelected(count);
        setSelected(newSelected);
    };

    const handleClick = (event: React.MouseEvent<unknown>, modelid: number) => {
        const newSelected = new Set(selected);
        const alreadySelected = newSelected.delete(modelid);
        if (!alreadySelected) {
            newSelected.add(modelid);
            setNumSelected(numSelected + 1);
        } else {
            setNumSelected(numSelected - 1);
        }
        setSelected(newSelected);
    };
    const isSelected = (modelid: number) => selected.has(modelid);
    return (
        <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="shop table">
            <ShopSectionTableHead
                classes={classes}
                shopName={shopName}
                numSelected={numSelected}
                rowCount={rows.length}
                onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
                {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.modelid);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            className={classes.row}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                        >
                            <TableCell onClick={(event) => handleClick(event, row.modelid)} padding="checkbox">
                                <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                            </TableCell>
                            <TableCell
                                className={classes.cell_overview}
                                component="th"
                                id={labelId}
                                scope="row"
                                onClick={(event) => handleClick(event, row.modelid)}
                                // padding="none"
                            >
                                {row.name + (row.modelname && ` - ${row.modelname}`)}
                            </TableCell>
                            <TableCell className={classes.cell_unit_price} align="right">
                                <s>{numberWithCommas(row.oldprice / 100000)}</s> {numberWithCommas(row.price / 100000)}
                            </TableCell>
                            <TableCell className={classes.cell_quantity} align="right">
                                <GroupedButtons size="small" value={row.quantity} setValue={(e) => console.log(e)} />
                            </TableCell>
                            <TableCell className={classes.cell_total_price} align="right">
                                {numberWithCommas((row.price * row.quantity) / 100000)}
                            </TableCell>
                            <TableCell className={classes.cell_action} align="center">
                                <IconButton onClick={() => handleDeleteTargetDialogOpen(row)}>
                                    <Delete className={classes.blackIcon} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

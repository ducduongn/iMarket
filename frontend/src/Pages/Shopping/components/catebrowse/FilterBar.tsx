import {
    Box,
    Button,
    Card,
    Checkbox,
    Chip,
    Divider,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    Popover,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { ArrowDropDown, CheckBox, MoreHoriz, SearchOutlined, TagFaces } from '@material-ui/icons';
import React, { Dispatch, SetStateAction } from 'react';
import { FILTER_SECTIONS } from '../../../../objects/ProductDetail';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: '24px',
    },
    search: {
        display: 'flex',
        padding: '16px',
        alignItems: 'center',
    },
    inputSearch: {
        marginLeft: '16px',
    },
    chips: {
        display: 'flex',
        padding: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    filterButtonIcon: {
        marginRight: '4px',
    },
    menus: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '8px',
        alignItems: 'center',
    },
}));
export interface ChipData {
    key: number;
    label: string;
}

/**
 *
 * @param {*} options danh sách các lựa chọn cho filter
 * @param {*} headingName tên cho phần heading
 * @param {*} icon icon cho phần heading
 */
export function ProductFilterSectionHeading(props: {
    options: string[];
    baseInd: number;
    headingName: string;
    icon: React.ReactNode;
    toggleFunc: (c: ChipData) => void;
    chipData: ChipData[];
}): JSX.Element {
    const { options, toggleFunc, chipData, baseInd } = props;
    return (
        <List component="div" disablePadding>
            {options.map((value, i) => {
                const labelId = `ch eckbox-list-label-${i}`;
                return (
                    <ListItem
                        key={i}
                        role={undefined}
                        dense
                        button
                        onClick={() => toggleFunc({ key: i + baseInd, label: value })}
                    >
                        {/* Phần chứa text miêu tả option */}
                        <ListItemText id={labelId}>
                            <Typography variant="subtitle2">{value}</Typography>
                        </ListItemText>
                        {/* Phần chứa checkbox */}
                        <ListItemSecondaryAction>
                            <Checkbox
                                onClick={() => toggleFunc({ key: i + baseInd, label: value })}
                                edge="end"
                                checked={chipData.find((o) => o.key == i + baseInd) !== undefined}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

function FilterBar(props: { chipData: ChipData[]; setChipData: Dispatch<SetStateAction<ChipData[]>> }): JSX.Element {
    const { chipData, setChipData } = props;
    const filterSection = FILTER_SECTIONS;
    const baseInd: number[] = [];
    const baseKeywordInd = filterSection
        .map((o) => o.options.length)
        .reduce((a, c) => {
            baseInd.push(a);
            return a + c;
        }, 0);
    const classes = useStyles();
    // const [chipData, setChipData] = React.useState<ChipData[]>([]);
    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData(chipData.filter((chip) => chip.key !== chipToDelete.key));
    };
    const handleEnterKeyword = (label: string) => {
        if (chipData.find((o) => o.label.toLowerCase() == label.toLowerCase())) return;
        const key = Math.max(Math.max(...chipData.map((o) => o.key)) + 1, baseKeywordInd);
        console.log('key', key);
        setChipData([...chipData, { key, label }]);
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = (c: ChipData) => {
        const ind = chipData.findIndex((o) => c.key == o.key);
        console.log(chipData, ind);
        if (ind >= 0) {
            console.log(c)
            chipData.splice(ind as number, 1)
            console.log("Del", c)
            setChipData([...chipData]);
        } else {
            console.log("Add", c)
            setChipData([...chipData, c]);
        }
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box className={classes.root}>
            <Card elevation={1}>
                <Box className={classes.search}>
                    <SearchOutlined fontSize="small" />
                    <Input
                        disableUnderline
                        className={classes.inputSearch}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                handleEnterKeyword((e.target as HTMLTextAreaElement).value);
                                // NOTE: Blur active element to trigger a blur on Enter key press
                                if (document && document.activeElement) (document.activeElement as HTMLElement).blur();
                                (e.target as HTMLTextAreaElement).value = '';
                            }
                        }}
                        fullWidth
                        placeholder="Enter a keyword"
                    />
                </Box>
                <Divider />
                <Box className={classes.chips}>
                    {chipData.map((data) => {
                        return (
                            <Chip
                                key={data.key}
                                label={data.label}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                            />
                        );
                    })}
                </Box>
                <Divider />
                <Box className={classes.menus}>
                    {filterSection.map((v, i) => {
                        const Icon = v.icon;
                        return (
                            <Button key={v.idFilterSection} onClick={handleClick} value={i}>
                                <Icon className={classes.filterButtonIcon} /> {v.headingName}{' '}
                                <ArrowDropDown fontSize="small" />
                            </Button>
                        );
                    })}

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {anchorEl && (
                            <ProductFilterSectionHeading
                                baseInd={baseInd[parseInt(anchorEl.value)]}
                                {...filterSection[parseInt(anchorEl.value)]}
                                toggleFunc={handleToggle}
                                chipData={chipData}
                            />
                        )}
                    </Popover>
                </Box>
            </Card>
        </Box>
    );
}

export default FilterBar;

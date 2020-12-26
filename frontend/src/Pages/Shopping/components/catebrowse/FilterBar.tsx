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
import React from 'react';
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
interface ChipData {
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
    headingName: string;
    icon: React.ReactNode;
    reset: number;
}): JSX.Element {
    const { options, reset } = props;

    // State và function cho checkbox
    const [checked, setChecked] = React.useState<number[]>([]);
    const handleToggle = (value: number) => () => {
        console.log('add ', value);
        // Thêm index của value nếu không có trong checked, xóa nếu đã có.
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    //
    const [trackReset, setTrackReset] = React.useState(reset);
    if (trackReset !== reset) {
        setTrackReset(reset);
    }
    React.useEffect(() => {
        setChecked([]);
    }, [trackReset]);

    return (
        <List component="div" disablePadding>
            {options.map((value, i) => {
                const labelId = `ch eckbox-list-label-${i}`;
                return (
                    <ListItem key={i} role={undefined} dense button onClick={handleToggle(i)}>
                        {/* Phần chứa text miêu tả option */}
                        <ListItemText id={labelId}>
                            <Typography variant="subtitle2">{value}</Typography>
                        </ListItemText>
                        {/* Phần chứa checkbox */}
                        <ListItemSecondaryAction>
                            <Checkbox
                                onClick={handleToggle(i)}
                                edge="end"
                                checked={checked.indexOf(i) !== -1}
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
function FilterBar(): JSX.Element {
    const classes = useStyles();
    const [chipData, setChipData] = React.useState<ChipData[]>([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);
    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Box className={classes.root}>
            <Card elevation={1}>
                <Box className={classes.search}>
                    <SearchOutlined fontSize="small" />
                    <Input disableUnderline className={classes.inputSearch} fullWidth placeholder="Enter a keyword" />
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
                    {Object.keys(FILTER_SECTIONS).map((v) => {
                        const Icon = FILTER_SECTIONS[v as keyof typeof FILTER_SECTIONS].icon;
                        return (
                            <Button key={v} onClick={handleClick} value={v}>
                                <Icon className={classes.filterButtonIcon} />{' '}
                                {FILTER_SECTIONS[v as keyof typeof FILTER_SECTIONS].headingName}{' '}
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
                                reset={0}
                                {...FILTER_SECTIONS[anchorEl.value as keyof typeof FILTER_SECTIONS]}
                            />
                        )}
                    </Popover>
                </Box>
            </Card>
        </Box>
    );
}

export default FilterBar;

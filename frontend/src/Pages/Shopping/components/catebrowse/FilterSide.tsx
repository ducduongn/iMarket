import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ListItemSecondaryAction, Button, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import ProcessorIcon from './icons/ProcessorIcon';
import RamIcon from './icons/RamIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        width: 300,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

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
    const { options, headingName, icon, reset } = props;

    // Đóng mở danh sách filter
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

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
        <Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={headingName} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {options.map((value, i) => {
                        const labelId = `ch eckbox-list-label-${i}`;
                        return (
                            <ListItem key={i} role={undefined} dense button onClick={handleToggle(i)}>
                                <ListItemIcon>{/* Dùng để lùi đầu dòng các option */}</ListItemIcon>
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
            </Collapse>
        </Fragment>
    );
}

const filterSections = [
    {
        headingName: 'PROCESSORS',
        idFilterSection: 'pro01',
        icon: <ProcessorIcon />,
        options: [
            'Intel 10th Gen. (Comet-Lake)',
            'Intel 9th Gen. (Coffe-Lake)',
            'Intel 8th Gen. (Coffe-Lake)',
            'AMD 3rd GEN Ryzen',
        ],
    },
    {
        headingName: 'GRAPHICS',
        idFilterSection: 'gra02',
        icon: <ProcessorIcon />,
        options: [
            'GeForce RTX 2080 SUPER',
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080',
            'GeForce RTX 2070 SUPER',
            'GeForce RTX 2070',
        ],
    },
    {
        headingName: 'RAM',
        idFilterSection: 'ram03',
        icon: <RamIcon />,
        options: ['32 GB', '16 GB', '8 GB', '4 GB'],
    },
];

export default function FilterSide(): JSX.Element {
    const classes = useStyles();
    const [resetValue, setResetValue] = React.useState(0); // integer state
    const reset = () => {
        console.log('inupdate: ', resetValue);
        setResetValue(resetValue + 1);
    };
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Filter
                </ListSubheader>
            }
            className={classes.root}
        >
            {filterSections.map((value) => (
                <ProductFilterSectionHeading key={value.headingName} reset={resetValue} {...value} />
            ))}
            <Button onClick={reset}>Reset</Button>
        </List>
    );
}

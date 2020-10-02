import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { typography } from '@material-ui/system';
import { List, ListItem, Paper, ListItemText, Popover, IconButton, Hidden, Drawer, ListItemSecondaryAction, Collapse, ListSubheader, Divider } from '@material-ui/core';
// Icons 
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// Protocols
import { getCategory } from '../../protocol/DataCall'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: 400,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function CategoryList(props) {
    const { list } = props;
    const mainCate = Object.keys(list);
    const classes = useStyles();

    const [open, setOpen] = React.useState(-1);

    const handleClick = (i) => () => {
        if (open == i) {
            i = -1;
        }
        setOpen(i);
    };
    const subCateComp = (
        <Collapse in={open != -1} timeout="auto" unmountOnExit>
            <IconButton onClick={handleClick(-1)}>
                <ArrowBackIosIcon />
            </IconButton>
            {
                open != -1 ?

                    Object.keys(list[mainCate[open]]).map((sectionId) => (
                        <Fragment>
                            <List
                                component="nav"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        {sectionId.toUpperCase()}
                                    </ListSubheader>
                                }
                                width="100%"
                            >
                                {list[mainCate[open]][sectionId].map((item) => (
                                    <ListItem key={`item-${sectionId}-${item}`} button>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                        </Fragment>
                    ))
                    :
                    <div></div>
            }
        </Collapse>
    )

    return (
        <Fragment>
            <Collapse in={open == -1}>
                <List
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            CATEGORY
                        </ListSubheader>
                    }
                    className={classes.root}
                >
                    {
                        Object.keys(list).map((value, i) =>
                            (
                                <ListItem button onClick={handleClick(i)} key={i}>
                                    <ListItemText primary={value} />
                                </ListItem>
                            ))
                    }
                </List>
            </Collapse>
            {subCateComp}
        </Fragment>

    );
}

const usePopupStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
    },
})
);

export default function CategoryDrawer(props) {
    const [data_category, setCategory] = useState();
    const [openState, setOpenState] = useState(false);
    React.useEffect(() => {
        getCategory(setCategory)
    }, [])
    const toggleOpen = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenState(open);
    }
    return (
        <Fragment>
            <Button variant="outlined" onClick={toggleOpen(true)}>
                <MenuIcon />
            </Button>
            <Drawer anchor="left" open={openState} onClose={toggleOpen(false)}>
                <CategoryList list={data_category} />
            </Drawer>
        </Fragment >
    );
}
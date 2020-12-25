import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, IconButton, Drawer, Collapse, ListSubheader } from '@material-ui/core';
// Icons 
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// Protocols
import { api_getCategory, buildCategoryTree, CateIdToName } from '../../protocol/ProductCall'
import { Link } from 'react-router-dom';

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

function ToCateList(props) {
    const { header, array, onClick } = props
    return <List
        component="nav"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                {header.toUpperCase()}
            </ListSubheader>
        }
        width="100%"
    >
        {array.map((item, i) => (
            <ListItem key={`item-${item}`} button onClick={onClick ? onClick(i) : null}>
                <ListItemText primary={item.toUpperCase()} />
            </ListItem>
        ))}
    </List>
}

function CategoryList(props) {
    const { root, idName } = props;
    const list = CateIdToName(root, idName)
    const mainCate = Object.keys(list);
    const [open, setOpen] = React.useState(-1);
    const handleClick = (i) => () => {
        if (open == i) {
            i = -1;
        }
        setOpen(i);
    };
    return (
        <Fragment>
            <Collapse in={open == -1}>
                <ToCateList header="Category" array={mainCate} onClick={handleClick} />
            </Collapse>
            <Collapse in={open != -1} timeout="auto" unmountOnExit>
                <IconButton onClick={handleClick(-1)}>
                    <ArrowBackIosIcon />
                </IconButton>
                {
                    open != -1 ?
                        <ToCateList header={mainCate[open]} array={list[mainCate[open]]} />
                        :
                        <div></div>
                }
            </Collapse>
        </Fragment>
    );
}


export default function CategoryDrawer() {
    const [data_category, setCategory] = useState();
    const [openState, setOpenState] = useState(false);
    React.useEffect(() => {
        api_getCategory(data => {
            const [root, name] = buildCategoryTree(data)
            setCategory([root, name])
        })
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
                {data_category && <CategoryList root={data_category[0]} idName={data_category[1]} />}
            </Drawer>
        </Fragment >
    );
}
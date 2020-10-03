import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import FilterSide from './FilterSide'
import Main from './Main';

const drawerWidth = 450;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: 0,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function ListProduct() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="filter">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smDown implementation="css">
                    <Toolbar>
                        {/* Dùng để đẩy FilterSide xuống */}
                    </Toolbar>
                    <FilterSide />
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Main />
            </main>
        </div>
    )
}

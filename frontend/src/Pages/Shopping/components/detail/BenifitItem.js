import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 30%',
    },
    avatar: {
        width: '70%',
        height: '70%',
    },
}));

function BenifitItem() {
    const classes = useStyles();
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    className={classes.avatar}
                    src={`${process.env.PUBLIC_URL}/assets/images/icons/check-icon-yellow.svg`}
                />
            </ListItemAvatar>
            <Typography variant="subtitle2">Hoàn tiền nếu hàng giả</Typography>
        </ListItem>
    );
}

export default BenifitItem;

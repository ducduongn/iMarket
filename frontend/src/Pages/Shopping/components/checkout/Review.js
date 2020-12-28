import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../../utils';
// const products = [
//     { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//     { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//     { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//     { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//     { name: 'Shipping', desc: '', price: 'Free' },
// ];
const addresses = ['144 Xuan Thuy', 'Cau Giay', 'Ha Noi', '99999', 'VN'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr UET' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();
    const products = useSelector((state) => {
        const ret = [];
        const cart = state.cart;
        cart.data.map((s) =>
            s.items.map((i) => ret.push({ name: i.name, desc: s.shop.shopname, price: i.price / 100000 })),
        );
        return ret;
    });
    const shipName = 'UET';
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <Grid container alignContent="space-between">
                            <Grid item xs={8}>
                                <ListItemText primary={product.name} secondary={product.desc} noWrap />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" variant="body2">{numberWithCommas(product.price)} VND</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {numberWithCommas(products.map(o => o.price).reduce((a, c) => a+c ))} VND
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{shipName}</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

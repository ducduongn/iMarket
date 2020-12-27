import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import PropsRoute from '../../shared/components/route/PropsRoute';
import Home from './home/Home';
import ProductDetail from './detail/Detail.page';
import Browse from './catebrowse/Browse.page';
import Cart from './cart/Cart.page';
import Checkout from './checkout/Checkout.page';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        width: 'auto',
        [theme.breakpoints.up('xs')]: {
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: '82.5%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.up('lg')]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

function Routing(props) {
    const { classes, selectHome } = props;
    return (
        <div className={classes.wrapper}>
            <Switch>
                {/* {blogPosts.map((post) => (
        <PropsRoute
          path={post.url}
          component={BlogPost}
          title={post.title}
          key={post.title}
          src={post.src}
          date={post.date}
          content={post.content}
          otherArticles={blogPosts.filter(
            (blogPost) => blogPost.id !== post.id
          )}
        />
      ))} */}
                <PropsRoute path="/checkout" component={Checkout} />
                <PropsRoute path="/cart" component={Cart} />
                <PropsRoute path="/browse" component={Browse} />
                <PropsRoute exact path="/detail/:id(\d+)/" component={ProductDetail} />
                <PropsRoute path="/" component={Home} selectHome={selectHome} />
            </Switch>
        </div>
    );
}

Routing.propTypes = {
    //   blogposts: PropTypes.arrayOf(PropTypes.object),
    selectHome: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));

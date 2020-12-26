import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import PropsRoute from '../../shared/components/route/PropsRoute';
import Home from './home/Home';
import ProductDetail from './detail/Detail.page';
import Browse from './catebrowse/Browse.page';
import Cart from './cart/Cart.page';
import Checkout from './checkout/Checkout.page';

function Routing(props) {
    const { selectHome } = props;
    return (
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
            <PropsRoute path="/detail" component={ProductDetail} />
            <PropsRoute path="/" component={Home} selectHome={selectHome} />
        </Switch>
    );
}

Routing.propTypes = {
    //   blogposts: PropTypes.arrayOf(PropTypes.object),
    selectHome: PropTypes.func.isRequired,
};

export default memo(Routing);

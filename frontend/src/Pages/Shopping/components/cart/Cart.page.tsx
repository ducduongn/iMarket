import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartTypes } from '../../../../redux/cart/cart';
import { FETCH_CART_DATA } from '../../../../redux/cart/cart.types';
import { RootState } from '../../../../redux/root-reducer';
import { action } from '../../../../redux/store';
import CartTable from './CartTable';

const connector = connect((state: RootState) => ({ cart: state.cart }), {});

type ConnectReduxProps = ConnectedProps<typeof connector>;
function CartPage(props: ConnectReduxProps): JSX.Element {
    const { cart } = props;
    const [data, setData] = useState<CartTypes>(cart.data);
    React.useEffect(() => setData(cart.data), [cart]);
    React.useEffect(() => {
        action(FETCH_CART_DATA);
    }, []);
    return (
        <main>
            <section>
                <CartTable data={data} setData={setData} />
            </section>
            <section>
                <Link to="checkout">
                    <Button>Mua hàng</Button>
                </Link>
            </section>
        </main>
    );
}
export default connector(CartPage);

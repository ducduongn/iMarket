import { Card, Grid } from '@material-ui/core';
import React from 'react';
import { PRODUCT_LIST } from '../../../../objects/ProductDetail';
import ActiveLastBreadcrumb from '../../../shared/components/ActiveLastBreadcrumb';
import CustomCard from '../../../shared/components/layout/CustomCard';
import smoothScrollTop from '../../../shared/functions/smoothScrollTop';
import { ProductCard } from '../home/ProductListSection';
import FilterBar from './FilterBar';
import FilterSide from './FilterSide';
import ItemFilterResult from './ItemFilterResult';

const path = ['Home', 'Laptop', 'Laptop Gamming', 'ProductName'];
const href = ['/', '#', '#', '#'];
function Browse(): JSX.Element {
    React.useEffect(() => smoothScrollTop(), []);
    return (
        <main>
            <section>
                <ActiveLastBreadcrumb path={path} href={href} />
            </section>
            <section>
                <FilterBar />
            </section>
            <section>
                <ItemFilterResult />
            </section>
        </main>
    );
}

export default Browse;

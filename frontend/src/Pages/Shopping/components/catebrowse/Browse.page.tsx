import { Card, Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { PRODUCT_LIST } from '../../../../objects/ProductDetail';
import { ProductCardView, ProductListApiResponse } from '../../../../redux/product/product.d';
import { api_get_productList, res2cards } from '../../../../redux/product/product.manager';
import ActiveLastBreadcrumb from '../../../shared/components/ActiveLastBreadcrumb';
import CustomCard from '../../../shared/components/layout/CustomCard';
import smoothScrollTop from '../../../shared/functions/smoothScrollTop';
import { ProductCard } from '../home/ProductListSection';
import FilterBar, { ChipData } from './FilterBar';
import FilterSide from './FilterSide';
import ItemFilterResult from './ItemFilterResult';

const path = ['Home', 'Laptop', 'Laptop Gamming', 'ProductName'];
const href = ['/', '#', '#', '#'];
const SORT = ['Most recent', 'Most Rating', 'Shop Rating', 'Price'];
const avaiOrderField = ['ctime', 'rating__rating_star', 'shop__rating_star', 'min_price'];
function Browse(): JSX.Element {
    React.useEffect(() => smoothScrollTop(), []);
    const [resonse, setResponse] = useState<ProductListApiResponse | undefined>();
    const [chipData, setChipData] = React.useState<ChipData[]>([]);
    const [ordering, setOrdering] = React.useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        const query = chipData.map((o) => o.label).join(' ');
        api_get_productList({ onSuccess: setResponse, limit: 8, query: query, ordering: avaiOrderField[ordering] });
    }, [chipData, ordering]);
    const fetchNewPage = (limit, offset) => {
        setLoading(true);
        api_get_productList({ onSuccess: setResponse, limit, offset });
    };
    useEffect(() => {
        if (resonse != undefined) {
            setLoading(false);
        }
    }, [resonse]);
    return (
        <main>
            <section>
                <ActiveLastBreadcrumb path={path} href={href} />
            </section>
            <section>
                <FilterBar chipData={chipData} setChipData={setChipData} />
            </section>
            <section>
                <ItemFilterResult
                    loading={loading}
                    count={resonse && resonse.count}
                    productList={resonse && res2cards(resonse)}
                    fetchNewPage={fetchNewPage}
                    {...{ ordering, setOrdering, SORT }}
                />
            </section>
        </main>
    );
}

export default Browse;

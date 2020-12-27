import React, { useEffect, useState } from 'react';
import MainFeaturePost from './MainFeaturePost';
import CategorySection from './CategorySection';
import ProductListSection from './ProductListSection';
import { PRODUCT_LIST } from '../../../../objects/ProductDetail';
import { api_get_productList, res2cards } from '../../../../redux/product/product.manager';
import { ProductCardView } from '../../../../redux/product/product.d';
// import PricingSection from "./PricingSection";

function Home(props: { selectHome: () => unknown }): JSX.Element {
    const [productList, setProductList] = useState<ProductCardView[]>(PRODUCT_LIST);
    const { selectHome } = props;
    useEffect(() => {
        selectHome();
        api_get_productList({onSuccess: (data) => setProductList(res2cards(data))});
    }, [selectHome]);
    return (
        <main>
            {/* <MainFeaturePost /> */}
            <MainFeaturePost />
            <CategorySection />
            <ProductListSection title="Dành riêng cho bạn" productList={productList} />
            <ProductListSection title="Thiết bị âm thanh" productList={productList} />
            {/* <FeatureSection /> */}
            {/* <PricingSection /> */}
        </main>
    );
}

export default Home;

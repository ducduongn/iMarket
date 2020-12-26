import React, { useEffect, useState } from 'react';
import MainFeaturePost from './MainFeaturePost';
import CategorySection from './CategorySection';
import ProductListSection, { ProductOverviewType } from './ProductListSection';
import { PRODUCT_LIST } from '../../../../objects/ProductDetail';
import { get_products } from '../../../../redux/product/product.manager';
// import PricingSection from "./PricingSection";

function Home(props: { selectHome: () => unknown }): JSX.Element {
    const [productList, setProductList] = useState<ProductOverviewType[]>(PRODUCT_LIST);
    const { selectHome } = props;
    useEffect(() => {
        selectHome();
        get_products(setProductList);
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

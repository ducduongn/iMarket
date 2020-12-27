import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { OptionsType, PDType, PRODUCT_DETAIL } from '../../../../objects/ProductDetail';
import { ProductDetailView, ProductModelResponse } from '../../../../redux/product/product.d';
import { api_get_productDetail } from '../../../../redux/product/product.manager';
import ActiveLastBreadcrumb from '../../../shared/components/ActiveLastBreadcrumb';
import ProductMainFeature from './ProductMainFeature';
// import PricingSection from "./PricingSection";

const path = ['Home', 'Laptop', 'Laptop Gamming', 'ProductName'];
const href = ['/', '#', '#', '#'];

const SHOPs_SUMMARY = {
    shop01: {
        name: 'Shop 1',
        slogan: 'Chúng tôi cam kết hàng chĩnh hãng',
        warrantyTime: 'Bảo hành 3 tháng - 1 đổi 1 trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất',
    },
    shop02: {
        name: 'Shop 2',
        slogan: 'Chúng tôi cam kết hàng chĩnh hãng',
        warrantyTime: 'Bảo hành 3 tháng - 1 đổi 1 trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất',
    },
    shop03: {
        name: 'Shop 3',
        slogan: 'Chúng tôi cam kết hàng chĩnh hãng',
        warrantyTime: 'Bảo hành 3 tháng - 1 đổi 1 trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất',
    },
};
// type ProductDetailOptionType = typeof PRODUCT_DETAIL.options;
function getListPrice(options: OptionsType): number[] {
    return Object.keys(options)
        .map((k) => {
            const price = options[k as keyof typeof options].price;
            return price;
        })
        .filter((x) => x > 0);
}

function ProductDetail(props: {match: {params:{id: number}}}): JSX.Element {
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    const [product, setPd] = useState<ProductDetailView | undefined>();
    const [model, selectModel] = useState<ProductModelResponse | undefined>();
    React.useEffect(() => {
        api_get_productDetail(props.match.params.id, setPd);
    }, []);
    React.useEffect(() => {
        if (product !== undefined && product?.variations.length == 0) {
            selectModel(product.models[0]);
        }
    }, [product]);
    return (
        <main>
            <section>
                <ActiveLastBreadcrumb path={path} href={href} />
            </section>
            <ProductMainFeature product={product} buyQuantity={buyQuantity} setBuyQuantity={setBuyQuantity} selectedModel={model} selectModel={selectModel} />
            {/* <div>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
            </div> */}
        </main>
    );
}

ProductDetail.propTypes = {};

export default ProductDetail;

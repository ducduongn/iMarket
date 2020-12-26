import React, { useEffect, useState } from 'react';
import { OptionsType, PDType, PRODUCT_DETAIL } from '../../../../objects/ProductDetail';
import { getProductDetail } from '../../../../redux/product/product.manager';
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

function ProductDetail(): JSX.Element {
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    const [pd, setPd] = useState<PDType>(PRODUCT_DETAIL);
    React.useEffect(() => {
        getProductDetail(setPd);
    }, []);
    React.useEffect(() => {
        console.log('-==-------------');
        console.log(pd);
    }, [pd]);
    const prices = getListPrice(pd.options);
    console.log('prices', prices);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    console.log('prices__', minPrice, maxPrice);

    pd.options.default.price = minPrice;
    pd.options.default.maxPrice = maxPrice;

    const optionAvailables = pd.optionAvailables;
    const optionProps = optionAvailables.map((v) => {
        console.log(v);
        const optionName = v.name;
        const values = v.values;
        const [option, setOption] = useState<string>('default');
        return { optionName, values, option, setOption };
    });
    console.log(optionProps);

    let selectedOption = optionProps.map((v) => v.option).join(',');

    console.log(selectedOption);
    if (!(selectedOption in pd.options)) {
        selectedOption = 'default';
    }
    console.log(selectedOption);

    const currentOptionProps = pd.options[selectedOption as keyof OptionsType];
    const currentShop =
        SHOPs_SUMMARY[pd.options[selectedOption as keyof OptionsType].shop as keyof typeof SHOPs_SUMMARY];
    console.log(currentShop);

    return (
        <main>
            <section>
                <ActiveLastBreadcrumb path={path} href={href} />
            </section>
            <ProductMainFeature<string>
                {...pd}
                {...currentOptionProps}
                optionProps={optionProps}
                shopProps={{
                    name: currentShop.name,
                    slogan: currentShop.slogan,
                    link: '#',
                }}
                quantityProps={{ buyQuantity, availableQuantity: currentOptionProps.availableQuantity, setBuyQuantity }}
            />
        </main>
    );
}

ProductDetail.propTypes = {};

export default ProductDetail;

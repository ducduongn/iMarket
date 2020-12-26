import axios from 'axios';
import { PRODUCT_DETAIL, PDType } from '../../objects/ProductDetail';
import { ProductOverviewType } from '../../Pages/Shopping/components/home/ProductListSection';

export function get_products(onSuccess: (data: ProductOverviewType) => unknown): void {
    axios.get('/api/vi/martService/products/').then((res) => {
        const data = res.data;
        const plist = data.results.map((p) => ({
            name: p.name,
            image: p.image,
            price: p.productmodel_set[0].price / 10000,
            compare: p.oldprice,
        }));
        onSuccess(plist);
    });
}

export function getProductDetail(onSuccess: (data: PDType) => unknown): void {
    axios.get('/api/vi/martService/products/').then((res) => {
        const data = res.data.results[0];
        const tier_variations = data.tiervariation_set.map((t) => ({
            name: t.name,
            values: t.options.split(',').map((opt) => ({ value: opt, text: opt })),
            id: t.id,
        }));
        const options = {
            default: {
                text: 'default',
                price: -1,
                maxPrice: -1,
                availableQuantity: -1,
                shop: 'shop01',
            },
        };
        data.productmodel_set.forEach((element) => {
            let k = '';
            if (tier_variations[0].options != '') {
                console.log(element);
                k = element.tier_indexs.split(',').reduce((a: string, b: string, i: number): string => {
                    return (a == '' ? a : a + ',') + tier_variations[i].values[parseInt(b)].value;
                }, '');
            } else {
                k = 'only';
            }
            options[k] = {
                text: k,
                price: element.price,
                availableQuantity: element.stock,
                shop: 'shop01',
            };
        });
        tier_variations.map((v) => v.values.push({ value: 'default', text: 'default' }));
        console.log(tier_variations);
        const plist = {
            name: data.name,
            rating: data.rating.rating,
            brand: data.brand,
            numRating: data.rating.count5,
            unit: '₫',
            gift: '$60 Apple Music gift card with purchase of select Beats products.',
            description: data.description,
            optionAvailables: tier_variations,
            defaultOption: 'black',
            comparePrice: data.oldprice,
            options: options,
        };
        console.log(plist);
        onSuccess(plist);
    });
}

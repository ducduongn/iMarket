import axios from 'axios';
import { PRODUCT_DETAIL, PDType } from '../../objects/ProductDetail';
import { ProductOverviewType } from '../../Pages/Shopping/components/home/ProductListSection';
import { ProductCardView, ProductListApiResponse, ProductResponse } from './product.d';

// ---------------------- Transform Functions ----------------------------
export function prod2prodCardView(prod: ProductResponse): ProductCardView {
    const { name, image, rating, oldprice, models } = prod;
    const res = { name, image, price: Math.min(...models.map((m) => m.price)), rating_star: rating.rating_star };
    if (oldprice > 0) res['oldprice'] = oldprice;
    return res;
}

export function api_get_productList(onSuccess: (data: ProductCardView[]) => unknown): void {
    axios.get('/api/vi/martService/products/').then((res) => {
        const data: ProductListApiResponse = res.data;
        const plist = data.results.map((pRes) => prod2prodCardView(pRes));
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

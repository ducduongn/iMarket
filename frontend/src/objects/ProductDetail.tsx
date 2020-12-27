import React from 'react';
import ProcessorIcon from '../Pages/Shopping/components/catebrowse/icons/ProcessorIcon';
import RamIcon from '../Pages/Shopping/components/catebrowse/icons/RamIcon';
import { ProductOverviewType } from '../Pages/Shopping/components/home/ProductListSection';
import Axios from 'axios';
import { ProductCardView } from '../redux/product/product.d';

export default class ProductDetail {}

export const PRODUCT_DETAIL = {
    name: 'Laptop MSI Gaming GS66 Stealth 10SE (407VN)',
    rating: 4,
    brand: 'MSI',
    numRating: 46,
    unit: '₫',
    gift: '$60 Apple Music gift card with purchase of select Beats products.',
    description: '(i7 10750H 16GB RAM/512GB SSD/RTX2060 6G/15.6 inch FHD 240Hz/Win 10)',
    optionAvailables: [
        {
            name: 'Màu sắc',
            values: [
                { value: 'default', text: 'default' },
                { value: 'black', text: 'Màu đen' },
                { value: 'blue', text: 'Màu xanh' },
            ],
            id: 'op01',
        },
        {
            name: 'Chất liệu',
            values: [
                { value: 'default', text: 'default' },
                { value: 'aluminum', text: 'nhôm' },
                { value: 'plastic', text: 'nhựa' },
            ],
            id: 'op02',
        },
    ],
    defaultOption: 'black',
    comparePrice: 43029000,
    options: {
        default: {
            // text: 'default',
            price: -1,
            maxPrice: -1,
            availableQuantity: -1,
            shop: 'shop01',
            othersShop: ['shop01', 'shop02'],
        },
        'blue,plastic': {
            price: 38052000,
            availableQuantity: 23,
            shop: 'shop01',
            othersShop: ['shop01', 'shop02'],
        },
        'black,plastic': {
            price: 37052000,
            availableQuantity: 0,
            shop: 'shop02',
            othersShop: ['shop03', 'shop02'],
        },
        'black,aluminum': {
            price: 37052000,
            availableQuantity: 23,
            shop: 'shop02',
            othersShop: ['shop03', 'shop02'],
        },
        'blue,aluminum': {
            price: 37052000,
            availableQuantity: 23,
            shop: 'shop02',
            othersShop: ['shop03', 'shop02'],
        },
    },
};

// const t = 'blue,aluminum';
export type OptionsType = Record<
    string,
    {
        // text: string;
        price: number;
        maxPrice?: number;
        availableQuantity: number;
        shop: string;
        othersShop?: string[];
    }
>;
export type PDType = Omit<typeof PRODUCT_DETAIL, 'options'> & { options: OptionsType };

export const PRODUCT_LIST: Array<ProductCardView> = [
    {
        itemid: 1,
        name: 'Tai Nghe Bluetooth Chụp Tai Sony WH-1000XM4 Hi-Res Noise Canceling - Hàng Chính Hãng',
        rating_star: 4,
        image: `${process.env.PUBLIC_URL}/assets/images/products/sp1.png`,
        price: 1200000,
        oldprice: 1500000,
    },
];

export const FILTER_SECTIONS = {
    cpu: {
        headingName: 'PROCESSORS',
        idFilterSection: 'pro01',
        icon: ProcessorIcon,
        options: [
            'Intel 10th Gen. (Comet-Lake)',
            'Intel 9th Gen. (Coffe-Lake)',
            'Intel 8th Gen. (Coffe-Lake)',
            'AMD 3rd GEN Ryzen',
        ],
    },
    gpu: {
        headingName: 'GRAPHICS',
        idFilterSection: 'gra02',
        icon: ProcessorIcon,
        options: [
            'GeForce RTX 2080 SUPER',
            'GeForce RTX 2080 Ti',
            'GeForce RTX 2080',
            'GeForce RTX 2070 SUPER',
            'GeForce RTX 2070',
        ],
    },
    ram: {
        headingName: 'RAM',
        idFilterSection: 'ram03',
        icon: RamIcon,
        options: ['32 GB', '16 GB', '8 GB', '4 GB'],
    },
};

export function getShopOrderData() {
    return Axios.get('/data/shop_order.json').then();
}

/* eslint-disable prettier/prettier */
export type TierVariation = {
    name: string;
    options: string[];
    images: string[];
};

export type ProductType = {
    itemid: number;
    createAt: string;
    name: string;
    oldprice: number;
    price: number;
    tier_variant: Array<TierVariation>;
};

// ------------------------Response Types-------------------------------
export type TierVariantResponse = {
    id: number;
    order_in_tier: number;
    name: string;
    numopt: number;
    options: string[];
};

export type ProductModelResponse = {
    modelid: number;
    tier_index: number[];
    price: number;
    stock: number;
    sold: number;
};

export type RatingResponse = {
    rating_star: number;
    rating_count: number[];
};

export type ShopSummaryResponse = {
    shopid: number;
    ctime: string;
    name: string;
    status: 1;
    description: string;
    rating_star: number;
};

export type ProductResponse = {
    itemid: number;
    shop: ShopSummaryResponse;
    name: string;
    brand: string;
    category: number;
    description: string;
    active: boolean;
    ctime: string;
    uptime: string;
    stock: number;
    oldprice: number;
    image: string;
    rating: RatingResponse;
    variations: TierVariantResponse[];
    models: ProductModelResponse[];
};

export type ProductListApiResponse = {
    count: number;
    next: string;
    previous: null | string;
    results: ProductResponse[];
}

// ------------------------View Types-------------------------------
export type ProductCardView = { 
    itemid: number;
    name: string; 
    image: string; 
    price: number; 
    rating_star: number;
    oldprice: number | undefined; 
};

export type ProductDetailView = ProductResponse
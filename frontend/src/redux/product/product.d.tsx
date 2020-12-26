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

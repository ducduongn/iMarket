import { CartItem, CartItemType, CartTypes, ModelOrderType, RowItemType } from './cart.d';
import axios from 'axios';
import { ProductModelResponse, ProductResponse } from '../product/product.d';

export function p2cartItem(p: ProductResponse, m: ProductModelResponse, quantity: number): CartItem {
    const shop = { shopid: p.shop.shopid, shopname: p.shop.name };
    let model_name = '';
    if (p.variations.length > 0) {
        model_name = m.tier_index.map((v, i) => p.variations[i].options[v]).join(', ');
    }

    const row = {
        shopid: p.shop.shopid,
        itemid: p.itemid,
        modelid: m.modelid,
        name: p.name,
        modelname: model_name,
        oldprice: p.oldprice * 100000,
        price: m.price * 100000,
        quantity: quantity,
    };
    return { shop: shop, items: [row] };
}

type UpdateCart = {
    success: boolean;
    tableData: CartTypes;
};
function createUpdateCartResponse(success: boolean, tableData: CartTypes): UpdateCart {
    return { success, tableData };
}
export function deleteTableDataByRow(tableData: CartTypes, row: RowItemType | undefined): UpdateCart {
    if (row != undefined) {
        const shop = tableData.find((v) => v.shop.shopid == row.shopid);
        if (shop != undefined) {
            const modelInd = shop.items.findIndex((i) => i.modelid == row.modelid);
            if (modelInd >= 0) {
                shop.items.splice(modelInd, 1);
                return createUpdateCartResponse(true, [...tableData.filter((s) => s.items.length > 0)]);
            }
        }
    }
    return createUpdateCartResponse(false, tableData);
}

export function deleteTableDataByModelId(tableData: CartTypes, modelid: number): UpdateCart {
    let modelInd = -1;
    const shop = tableData.find((s) => {
        modelInd = s.items.findIndex((i) => i.modelid == modelid);
        return modelInd > 0;
    });
    if (modelInd > 0) {
        shop.items.splice(modelInd, 1);
        return createUpdateCartResponse(true, [...tableData.filter((s) => s.items.length > 0)]);
    }
    return createUpdateCartResponse(false, tableData);
}

export function deleteTableDataByModelIds(tableData: CartTypes, modelids: Set<number>): UpdateCart {
    let count = 0;
    console.log(modelids);
    tableData.map((s) => {
        s.items = s.items.filter((i) => {
            console.log('filtering');
            const del = modelids.has(i.modelid);
            console.log(del);
            if (del) {
                console.log(i);
                count += 1;
            }
            return !del;
        });
    });
    if (count > 0) return createUpdateCartResponse(true, [...tableData.filter((s) => s.items.length > 0)]);
    return createUpdateCartResponse(false, tableData);
}

export function addCartItem(cart: CartTypes, cartitem: CartItem): UpdateCart {
    const newCart = [...cart];
    const shop = newCart.find((ci) => ci.shop.shopid == cartitem.shop.shopid);
    if (shop) {
        console.log(shop);
        console.log(cartitem);
        if (shop.items.find((i) => i.modelid === cartitem.items[0].modelid) === undefined) {
            console.log('added');
            shop.items = [...shop.items, cartitem.items[0]];
        }
    } else {
        newCart.push(cartitem);
    }
    return createUpdateCartResponse(true, newCart);
}

export function processFetchResponse(cartData: CartTypes): CartTypes {
    return cartData;
}

import { CartTypes, ModelOrderType, RowItemType } from './cart.d';
import axios from 'axios';

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

export function processFetchResponse(cartData: CartTypes): CartTypes {
    return cartData;
}

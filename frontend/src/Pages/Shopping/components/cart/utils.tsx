import { CartTypes, ModelOrderType, RowItemType } from './Cart.d';

export function createRowItem(item: ModelOrderType): RowItemType {
    return {
        shopid: item.shopid,
        itemid: item.itemid,
        modelid: item.modelid,
        name: item.name,
        modelname: item.model_name,
        price: item.price,
        oldprice: item.oldprice,
        quantity: item.quantity,
    };
}

export function createTableData(shop_order: CartTypes): CartTypes {
    return shop_order.map((v) => ({
        shop: { shopid: v.shop.shopid, shopName: v.shop.shopname },
        items: v.items.map((i) => createRowItem(i)),
    }));
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

/**
 * So sánh 2 object a, b cùng kiểu theo cùng key
 * @param a Phần tử thứ nhất
 * @param b Phần tử thứ hai
 * @param orderBy key dùng để so sánh
 */
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T): -1 | 0 | 1 {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof Record<string | number | symbol, unknown>>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

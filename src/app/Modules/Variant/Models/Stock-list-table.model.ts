import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { IProductsStock } from "../Interface/Variant.interface";
import { Table } from "../../Table/Models/Table.model";

export class ProductsStockListTable extends Table<IProductsStock> {
    public statusChange: Subject<number> = new Subject<number>();


    constructor(items: IProductsStock[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "ProductName",
                Value: "Nombre del producto",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "Name",
                Value: "Talle",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "Stock",
                Value: "Stock",
                Type: HeaderTypeEnum.Number
            },
            {
                Name: "ValuedStock",
                Value: "Stock valorizado",
                Type: HeaderTypeEnum.Price,
                ShowTotal: true
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (variantId: number) => this.editStock(variantId)
        }]
        super(headers, items, actions, totalItems);
    }

    editStock(variantId: number) {
        this.statusChange.next(variantId);
    }

}
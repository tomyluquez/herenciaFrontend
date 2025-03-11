import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { Table } from "../../Table/Models/Table.model";
import { IPriceListProducts } from "../Interface/Price-list.interface";

export class PriceListListTable extends Table<IPriceListProducts> {
    public edit: Subject<number> = new Subject<number>();


    constructor(items: IPriceListProducts[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "ProductName",
                Value: "Nombre del producto",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "Discount",
                Value: "Descuento",
                Type: HeaderTypeEnum.Discount
            },
            {
                Name: "PromotionalPrice",
                Value: "Precio promocional",
                Type: HeaderTypeEnum.Price
            },
            {
                Name: "Price",
                Value: "Precio",
                Type: HeaderTypeEnum.Price
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (priceListId: number) => this.editPriceList(priceListId)
        }]
        super(headers, items, actions, totalItems);
    }
    editPriceList(priceListId: number) {
        this.edit.next(priceListId);
    }

}
import { Subject } from "rxjs";
import { Table } from "../../Table/Models/Table.model";
import { IDiscountCoupon } from "../Interface/DiscountCoupon.interface";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";


export class DiscountCouponListTable extends Table<IDiscountCoupon> {
    public change: Subject<number> = new Subject<number>();

    constructor(items: IDiscountCoupon[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "Name",
                Value: "Nombre",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "Discount",
                Value: "Descuento",
                Type: HeaderTypeEnum.Percentage
            },
            {
                Name: "IsActive",
                Value: "Estado",
                Type: HeaderTypeEnum.Status
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (configId: number) => this.editStock(configId)
        }]
        super(headers, items, actions, totalItems);
    }

    editStock(configId: number) {
        this.change.next(configId);
    }

}
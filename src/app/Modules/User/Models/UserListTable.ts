import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { Table } from "../../Table/Models/Table.model";
import { IOrderUser } from "../Interface/User-pofile.interface";

export class UserListTable extends Table<IOrderUser> {
    public orderDetails: Subject<number> = new Subject<number>();

    constructor(items: IOrderUser[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "OrderNumber",
                Value: "Nro. de pedido",
                Type: HeaderTypeEnum.Number
            },
            {
                Name: "DateCreated",
                Value: "Fecha",
                Type: HeaderTypeEnum.Date
            },
            {
                Name: "OrderStatusId",
                Value: "Estado",
                Type: HeaderTypeEnum.OrderStatus,
            },
            // {
            //     Name: "QuantityItems",
            //     Value: "Cant. de productos",
            //     Type: HeaderTypeEnum.Number
            // },
            // {
            //     Name: "Total",
            //     Value: "Total",
            //     Type: HeaderTypeEnum.Price
            // }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-magnifying-glass",
            Handler: (orderNumber: number) => this.orderDetail(orderNumber)
        }]
        super(headers, items, actions, totalItems);
    }
    orderDetail(orderNumber: number) {
        this.orderDetails.next(orderNumber);
    }

}
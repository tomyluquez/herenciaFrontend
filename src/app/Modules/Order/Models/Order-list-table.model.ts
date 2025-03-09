import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { Table } from "../../Table/Models/Table.model";
import { IOrder } from "../Interface/order.interface";

export class OrderListTable extends Table<IOrder> {
    public statusChange: Subject<number> = new Subject<number>();
    public orderDetails: Subject<number> = new Subject<number>();


    constructor(items: IOrder[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "OrderNumber",
                Value: "Nro. de pedido",
                Type: HeaderTypeEnum.Number
            },
            {
                Name: "CustomerName",
                Value: "Cliente",
                Type: HeaderTypeEnum.Text
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
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (orderId: number) => this.changeState(orderId)
        }, {
            Icon: "fa-solid fa-magnifying-glass",
            Handler: (orderId: number) => this.orderDetail(orderId)
        }]
        super(headers, items, actions, totalItems);
    }

    changeState(orderId: number) {
        this.statusChange.next(orderId);
    }

    orderDetail(orderId: number) {
        this.orderDetails.next(orderId);
    }

}
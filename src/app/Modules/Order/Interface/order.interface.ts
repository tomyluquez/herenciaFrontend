import { IOrderStatus } from "./order-status.interface";

export interface IOrder {
    Id: number;
    OrderNumber: number;
    DateCreated: Date;
    customerName: string;
    OrderStatusId: number;
}
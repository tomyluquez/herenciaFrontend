import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IOrderDetail } from "../Interface/order-detail.interface";

export class SaveOrderResponse extends ResponseMessages {
    OrderNumber: number = 0;
    CustomerName: string = '';
    CustomerEmail: string = '';
    constructor() {
        super();
    }
}
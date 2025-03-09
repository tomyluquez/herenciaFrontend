import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IOrderDetail } from "../Interface/order-detail.interface";

export class OrderDetail extends ResponseMessages {
    Items: IOrderDetail;

    constructor() {
        super();
        this.Items = {} as IOrderDetail;
    }

}
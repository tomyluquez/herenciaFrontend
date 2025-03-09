import { IItemDataContainerCards } from "../../Other/Interface/Others.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IOrder } from "../Interface/order.interface";

export class DataContainerCards {
    Title!: string;
    Items!: IItemDataContainerCards[];
    QuantityPages!: number
}

export class OrderVM extends ResponseMessages {
    Items: IOrder[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
    setTotalItems(totalItems: number) {
        this.TotalItems = totalItems;
    }
}
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IPriceListProducts } from "../Interface/Price-list.interface";

export class PriceListProductsVM extends ResponseMessages {
    Items: IPriceListProducts[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}

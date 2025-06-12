import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IProductToSale } from "../Interface/Product.interface";

export class ProductToSale extends ResponseMessages {
    Items: IProductToSale[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

}
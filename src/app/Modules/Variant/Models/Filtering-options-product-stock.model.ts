import { NameAndId } from "../../Other/Interface/NameValue.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export class FilteringOptionsProductStockVM extends ResponseMessages {
    Categories: NameAndId[];
    Sizes: NameAndId[];
    Status: NameAndId[];
    RelatedProducts: NameAndId[]

    constructor() {
        super();
        this.Categories = [];
        this.Sizes = [];
        this.Status = [];
        this.RelatedProducts = [];
    }
}
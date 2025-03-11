import { NameAndId } from "../../Other/Interface/NameValue.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export class FilteringOptionsPriceListVM extends ResponseMessages {
    Categories: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
    }

}
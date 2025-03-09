import { NameAndId } from "../../Other/Interface/NameValue.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export class FilteringOptionsOrderListVM extends ResponseMessages {
    Status: NameAndId[];

    constructor() {
        super();
        this.Status = [];
    }
}
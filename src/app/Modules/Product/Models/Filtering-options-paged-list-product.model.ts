import { NameAndId } from "../../Other/Interface/NameValue.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";


export class FilteringOptionsPagedListProductVM extends ResponseMessages {
    Categories: NameAndId[];
    Status: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
        this.Status = []
    }

    addCategories(categories: NameAndId[]) {
        this.Categories = categories;
    }

}
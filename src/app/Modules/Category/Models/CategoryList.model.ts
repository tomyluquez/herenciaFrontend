import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { ICategoryVM } from "../Interfaces/Categories.interface";

export class CategoryListVM extends ResponseMessages {
    Items: ICategoryVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    AddCategory(category: ICategoryVM) {
        this.Items.push(category);
    }
}

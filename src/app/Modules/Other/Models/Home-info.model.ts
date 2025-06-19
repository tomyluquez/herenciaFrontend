import { CategoryListVM } from "../../Category/Models/CategoryList.model";
import { PromotionalProducts } from "../../Product/Interface/Products.interfaces";
import { ResponseMessages } from "../Interface/ResponseMessages.Interface";

export class HomeInfoResponse extends ResponseMessages {
    Categories!: CategoryListVM
    PromotionalProducts!: PromotionalProducts

}
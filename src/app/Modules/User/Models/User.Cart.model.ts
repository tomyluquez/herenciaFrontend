import { ICartItemsVM } from "../../Cart/Interfaces/Cart.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export class UserCartItemsVM extends ResponseMessages {
  Items: ICartItemsVM[];
  TotalItems: number;

  constructor() {
    super();
    this.Items = [];
    this.TotalItems = 0;
  }

  addItems(items: ICartItemsVM[]) {
    this.Items = items;
    this.TotalItems = items.length;
  }
}

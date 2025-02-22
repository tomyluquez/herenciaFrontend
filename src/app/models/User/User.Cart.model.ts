import { ICartItemsVM } from '../../interfaces/Cart.interface';
import { ResponseMessages } from '../../interfaces/ResponseMessages.Interface';

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

export interface ICartItemsVM {
  Id: number;
  ProductName: string;
  Quantity: number;
  Price: number;
  SizeName: string;
  UrlImage: string;
}

export interface UpdateQuantityCartItem {
  Quantity: number,
  ItemId: number,
  Action: number
}
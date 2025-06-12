export interface ICartItemsVM {
  Id: number;
  ProductName: string;
  Quantity: number;
  Price: number;
  SizeName: string;
  SizeId: number;
  UrlImage: string;
  VariantId: number;
}

export interface UpdateQuantityCartItem {
  Quantity: number,
  ItemId: number,
  Action: number
}
import { ResponseMessages } from './ResponseMessages.Interface';

export interface PromotionalProductsVM extends ResponseMessages {
  Items: IPromotionalProduct[];
}

export interface IPromotionalProduct {
  Id: number;
  Name: string;
  CategoryName: string;
  Price: number;
  Image: string;
}

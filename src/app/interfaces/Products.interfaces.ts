import { PaginationDTO } from './pagination.interface';
import { ResponseMessages } from './ResponseMessages.Interface';

export interface PromotionalProductsVM extends ResponseMessages {
  Items: IPromotionalProduct[];
}

export interface ProductPagedListVM extends ResponseMessages {
  Items: IProductPagedListVM[];
  TotalItems: number;
}

export interface IProductPagedListVM {
  Id: number;
  Name: string;
  CategoryName: string;
  Price: number;
  Image?: string;
  HasStock: boolean;
}

export interface IPromotionalProduct {
  Id: number;
  Name: string;
  CategoryName: string;
  Price: number;
  Image: string;
}

export interface ProductPagedListSearchDTO {
  Name: string;
  Categories: string;
  Sizes: string;
  Pagination: PaginationDTO;
  Order: string;
}

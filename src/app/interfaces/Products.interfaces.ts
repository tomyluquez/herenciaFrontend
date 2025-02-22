import { Product } from '../models/Product.model';
import { PaginationDTO } from './pagination.interface';
import { ResponseMessages } from './ResponseMessages.Interface';

export class PromotionalProductsVM extends ResponseMessages {
  Items!: IPromotionalProduct[];
}

export class ProductPagedListVM extends ResponseMessages {
  Items!: IProductPagedListVM[];
  TotalItems!: number;
}

export class ProductVM extends ResponseMessages {
  Items!: IProductVM[];
  TotalItems!: number;
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

export interface IProductVM {
  Id: number;
  Name: string;
  Price: number;
  Description: string;
  Variants?: IProductVariants[];
  Images: string[];
  CategoryName: string | null;
  CategoryId: number;
  Discount: number;
  Cost: number;
  IsActive?: boolean;
  IsPromotional?: boolean;
  PromotionalPrice: number;
}

export interface IProductVariants {
  Id?: number;
  Stock: number;
  Name: string;
  SizeId?: number;
  Product?: Product;
}

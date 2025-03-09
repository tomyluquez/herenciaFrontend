import { PaginationDTO } from "../../Other/Interface/pagination.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { Product } from "../Models/Product.model";

export class PromotionalProducts extends ResponseMessages {
  Items!: IPromotionalProduct[];
  TotalItems!: number;
}

export class ProductPagedList extends ResponseMessages {
  Items!: IProductPagedList[];
  TotalItems!: number;
}

export class Products extends ResponseMessages {
  Items!: IProduct[];
  TotalItems!: number;
}

export interface IProductPagedList {
  Id: number;
  Name: string;
  CategoryName: string;
  Price: number;
  PromotionalPrice: number;
  Image?: string;
  HasStock: boolean;
  IsActive: boolean;
}

export interface IPromotionalProduct {
  Id: number;
  Name: string;
  CategoryName: string;
  Price: number;
  Image: string;
}

export interface SearchProductPagedList {
  Name: string;
  Categories: string;
  Sizes: string;
  Pagination: PaginationDTO;
  Order: string;
  Status: number;
}

export interface IProduct {
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
  Id: number;
  Stock: number;
  Name: string;
  SizeId: number;
  Product?: Product;
  ProductId: number;
  ProductName?: string;
}
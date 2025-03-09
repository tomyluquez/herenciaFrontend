import { PaginationDTO } from "../../Other/Interface/pagination.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IProductVariants } from "../../Product/Interface/Products.interfaces";

export class ProductVarinantsVM extends ResponseMessages {
  Items: IProductVariants[];
  TotalItems: number;

  constructor() {
    super();
    this.Items = [];
    this.TotalItems = 0;
  }
}

export class ProductStockVM extends ResponseMessages {
  Items: IProductsStock[];
  TotalItems: number;

  constructor() {
    super();
    this.Items = [];
    this.TotalItems = 0;
  }
}

export interface IProductsStock {
  Id: number;
  Stock: number;
  Name: string;
  SizeId?: number;
  ProductId: number;
  ProductName?: string;
  ValuedStock: number;
}


export interface VariantSelected {
  VariantId: number;
  Quantity: number;
  UserId?: number;
  VariantName?: string;
}

export interface SearchProductsStockPagedList {
  ProductName: string;
  Pagination: PaginationDTO;
  Status: number;
  SizeId: number;
  CategoryId: number;
}
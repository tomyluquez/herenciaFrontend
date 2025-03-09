import { PaginationDTO } from "../../Other/Interface/pagination.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export interface CategoryListVM extends ResponseMessages {
  Items: ICategoryVM[];
  TotalItems: number;
}

export interface ICategoryVM {
  Id: number;
  Name: string;
  Image: string;
  IsActive?: boolean;
  Products?: string[]; //cambiar a modelo Product
}

export interface SearchCategoriesPagedList {
  Name: string;
  Pagination: PaginationDTO;
  Status: number;
}

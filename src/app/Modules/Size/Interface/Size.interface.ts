import { PaginationDTO } from "../../Other/Interface/pagination.interface";
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export interface ISizeListVM {
  Id: number;
  Name: string;
  IsActive?: boolean;
}

export interface SaveSize {
  Id: number;
  Name: string;
  Status: number;
}

export interface SearchSizePagedList {
  Name: string;
  Pagination: PaginationDTO;
  Status: number;
}
import { PaginationDTO } from "../../Other/Interface/pagination.interface";

export interface SearchOrderPagedList {
    CustomerName: string;
    Pagination: PaginationDTO;
    OrderStatus: number;
    OrderNumber: number;
    StartDate?: Date,
    EndDate?: Date
}
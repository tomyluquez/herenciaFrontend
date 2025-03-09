import { PaginationDTO } from "../../Other/Interface/pagination.interface";

export interface SearchProductPagedList {
    Name: string;
    Categories: string[];
    Sizes: number[];
    Pagination: PaginationDTO;
    Order: string;
    Status: boolean | undefined;
}

import { PaginationDTO } from "./pagination.interface";

export interface IDiscountCoupon {
    Id: number;
    Name: string;
    Discount: number;
    DateCreated: string;
    IsActive: boolean;
}

export interface SearchCouponList {
    Pagination: PaginationDTO;
    Status: boolean;
    Name: string;
}
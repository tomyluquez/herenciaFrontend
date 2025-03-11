import { PaginationDTO } from "../../Other/Interface/pagination.interface";

export interface IPriceListProducts {
    Id: number;
    ProductName: string;
    Price: number;
    Discount: number;
    PromotionalPrice: number;
}

export interface PriceListProductsSearch {
    ProductName: string;
    CategoryId: number;
    Pagination: PaginationDTO;
}

export interface UpdatePriceProduct {
    ProductId: number;
    Price: number;
    Discount: number;
    PromotionalPrice: number;
}

export interface UpdateAllPriceProduct {
    ActionType: number;
    Percentage?: number;
    Discount?: number;
    CategoryId?: number;
}


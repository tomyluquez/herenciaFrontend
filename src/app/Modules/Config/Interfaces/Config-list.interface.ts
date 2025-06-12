import { PaginationDTO } from "../../Other/Interface/pagination.interface";

export interface IConfig {
    Id: number;
    Name: string;
    Value: string;
}

export interface SearchConfigList {
    Pagination: PaginationDTO;
}

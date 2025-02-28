import { Subject } from "rxjs";
import { PaginationEnum } from "../../enums/pagination-enum";
import { NameAndValue } from "../../interfaces/NameValue.interface";
import { GenericItemTable, TableActions } from "../../interfaces/Tables/Table-actions.interface";

export class Table<T extends GenericItemTable> {
    Headers: NameAndValue[];
    Items: T[];
    Actions: TableActions[]
    Page: number;
    Limit: number;
    TotalItems: number;
    public pageChange: Subject<number> = new Subject<number>();


    constructor(headers: NameAndValue[], items: T[], actions: TableActions[] = [], totalItems: number) {
        this.Headers = headers;
        this.Items = items;
        this.Actions = actions
        this.TotalItems = totalItems;
        this.Page = PaginationEnum.Page;
        this.Limit = PaginationEnum.Limit;
    }

    updateData(items: T[], totalItems: number) {
        this.Items = items;
        this.TotalItems = totalItems;
    }

    nextPage() {
        this.Page++;
        this.pageChange.next(this.Page);
    }

    prevPage() {
        this.Page--;
        this.pageChange.next(this.Page);
    }
}
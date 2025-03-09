import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { Table } from "../../Table/Models/Table.model";
import { ICategoryVM } from "../Interfaces/Categories.interface";

export class CategoryListTable extends Table<ICategoryVM> {
    public statusChange: Subject<number> = new Subject<number>();
    public edit: Subject<number> = new Subject<number>();


    constructor(items: ICategoryVM[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "Image",
                Value: "Imagen",
                Type: HeaderTypeEnum.Image
            },
            {
                Name: "Name",
                Value: "Nombre",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "IsActive",
                Value: "Estado",
                Type: HeaderTypeEnum.Status
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (categoryId: number) => this.editCategory(categoryId)
        },
        {
            Icon: "fa-solid fa-arrows-rotate",
            Handler: (categoryId: number) => this.changeState(categoryId)
        }]
        super(headers, items, actions, totalItems);
    }

    changeState(categoryId: number) {
        this.statusChange.next(categoryId);
    }
    editCategory(categoryId: number) {
        this.edit.next(categoryId);
    }

}
import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { Table } from "../../Table/Models/Table.model";
import { ISizeListVM } from "../Interface/Size.interface";

export class SizeListTable extends Table<ISizeListVM> {
    public statusChange: Subject<number> = new Subject<number>();
    public edit: Subject<number> = new Subject<number>();


    constructor(items: ISizeListVM[], totalItems: number) {
        const headers: HeadersTable[] = [
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
            Handler: (sizeId: number) => this.editSize(sizeId)
        },
        {
            Icon: "fa-solid fa-arrows-rotate",
            Handler: (sizeId: number) => this.changeState(sizeId)
        }]
        super(headers, items, actions, totalItems);
    }

    changeState(sizeId: number) {
        this.statusChange.next(sizeId);
    }
    editSize(sizeId: number) {
        this.edit.next(sizeId);
    }

}
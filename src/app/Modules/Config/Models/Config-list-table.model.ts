import { Subject } from "rxjs";
import { HeadersTable, TableActions } from "../../Table/Interface/Table-actions.interface";
import { HeaderTypeEnum } from "../../Form/Enums/headers-form-type-enum";
import { Table } from "../../Table/Models/Table.model";
import { IConfig } from "../Interfaces/Config-list.interface";

export class ConfigkListTable extends Table<IConfig> {
    public change: Subject<number> = new Subject<number>();

    constructor(items: IConfig[], totalItems: number) {
        const headers: HeadersTable[] = [
            {
                Name: "Name",
                Value: "Nombre",
                Type: HeaderTypeEnum.Text
            },
            {
                Name: "Value",
                Value: "Valor",
                Type: HeaderTypeEnum.Text
            }
        ];

        const actions: TableActions[] = [{
            Icon: "fa-solid fa-pen-to-square",
            Handler: (configId: number) => this.editStock(configId)
        }]
        super(headers, items, actions, totalItems);
    }

    editStock(configId: number) {
        this.change.next(configId);
    }

}
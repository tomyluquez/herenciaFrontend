import { StatusEnum } from "../enums/status-enum";
import { NameAndValue } from "../interfaces/NameValue.interface";

export class StateOptions {
    private Active = StatusEnum.Active;
    private Inactive = StatusEnum.Inactive;

    constructor() { }

    getStateOptions(): NameAndValue[] {
        return [
            {
                Name: 'Activo',
                Value: this.Active
            },
            {
                Name: 'Inactivo',
                Value: this.Inactive
            }
        ]
    }
}
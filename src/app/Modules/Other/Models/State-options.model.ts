import { ActivationStatusEnum } from "../Enums/activation-status-enum";
import { NameAndValue } from "../Interface/NameValue.interface";

export class StateOptions {
    private Active = ActivationStatusEnum.Active;
    private Inactive = ActivationStatusEnum.Inactive;

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
import { NameAndValue } from "../../Other/Interface/NameValue.interface";

export interface IForm {
    Label: string;
    Placeholder: string;
    Type: number;
    Name: string;
    IsRequired: boolean;
    Options?: NameAndValue[];
    DefaultValue?: string | number | boolean;
    Values?: any[];
    Icon: string;
}
import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { IConfig } from "../Interfaces/Config-list.interface";

export class ConfigVM extends ResponseMessages {
    Items: IConfig[];
    TotalItems: number;
    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0
    }
}
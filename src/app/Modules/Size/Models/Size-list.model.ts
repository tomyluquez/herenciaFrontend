import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";
import { ISizeListVM } from "../Interface/Size.interface";

export interface SizeLlistVM extends ResponseMessages {
    Items: ISizeListVM[];
    TotalItems: number;
}
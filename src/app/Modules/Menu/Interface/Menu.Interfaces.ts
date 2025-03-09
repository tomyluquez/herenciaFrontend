import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export interface MenuVM extends ResponseMessages {
  Items: IMenuVM[];
}

export interface IMenuVM {
  Id?: number;
  Name: string;
  Icon?: string;
  Href?: string;
  IsAdmin?: boolean;
}

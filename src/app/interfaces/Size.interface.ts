import { ResponseMessages } from './ResponseMessages.Interface';

export interface SizeLlistVM extends ResponseMessages {
  Items: ISizeListVM[];
  TotalItems: number;
}

export interface ISizeListVM {
  Id: number;
  Name: string;
  IsActive: boolean;
}

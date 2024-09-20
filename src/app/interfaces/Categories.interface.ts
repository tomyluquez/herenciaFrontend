import { ResponseMessages } from './ResponseMessages.Interface';

export interface CategoryListVM extends ResponseMessages {
  Items: ICategoryVM[];
  TotalItems: number;
}

export interface ICategoryVM {
  Id: number;
  Name: string;
  Image: string;
  IsActive?: boolean;
  Products?: string[]; //cambiar a modelo Product
}

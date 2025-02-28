import { ResponseMessages } from "./ResponseMessages.Interface";

export interface CompanyInfoVM extends ResponseMessages {
  Items: ICompanyInfoVM[];
}

export interface ICompanyInfoVM {
  Id: number;
  Name: string;
  Value: string;
  Icon: string;
  IsActive: boolean;
}

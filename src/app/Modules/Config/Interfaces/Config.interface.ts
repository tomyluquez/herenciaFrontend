import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

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

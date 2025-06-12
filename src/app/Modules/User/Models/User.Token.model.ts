import { ResponseMessages } from "../../Other/Interface/ResponseMessages.Interface";

export class UserTokenVM extends ResponseMessages {
  Token: string;
  Role: number;
  CustomerName: string;

  constructor() {
    super();
    this.Token = '';
    this.Role = 0;
    this.CustomerName = '';
  }
}

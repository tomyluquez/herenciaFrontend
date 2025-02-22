import { ResponseMessages } from '../../interfaces/ResponseMessages.Interface';

export class UserTokenVM extends ResponseMessages {
  Token: string;
  Role: string;

  constructor() {
    super();
    this.Token = '';
    this.Role = '';
  }
}

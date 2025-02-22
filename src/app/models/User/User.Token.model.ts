import { ResponseMessages } from '../../interfaces/ResponseMessages.Interface';

export class UserTokenVM extends ResponseMessages {
  Token: string;
  Role: number;

  constructor() {
    super();
    this.Token = '';
    this.Role = 0;
  }
}

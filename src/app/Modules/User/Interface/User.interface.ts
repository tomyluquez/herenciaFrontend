export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  userName: string;
  email: string;
  password: string;
  phone: string;
  role?: number;
}

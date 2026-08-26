export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IAuthAdmin {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
}

export interface IAuthTokens {
  accessToken: string;
  admin: IAuthAdmin;
}

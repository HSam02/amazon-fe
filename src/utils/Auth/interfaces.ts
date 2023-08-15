export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IVerificationForm {
  email: string;
  code: string;
}

export interface IRegisterRequest extends IRegisterForm {
  verification: IVerification;
}

export interface IVerification {
  code: string;
  token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: "user";
  token: string;
}

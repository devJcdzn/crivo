import { FormValues as LoginFormValues } from "@/app/auth/login/_components/login-form";

export interface IUser {
  id: string;
  name: string;
  credential: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export type LoginRequest = LoginFormValues;

export interface LoginResponse {
  user: IUser;
  token: string;
}

export interface IAuthContext {
  user: any;
  isLoading: boolean;
  login: (loginRequest: LoginFormValues) => Promise<void>;
  requestUserData: (userId: string) => Promise<void>;
}

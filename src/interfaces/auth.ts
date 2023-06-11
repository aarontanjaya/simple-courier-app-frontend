import { CustomPayload } from './response';

export interface LoginResponsePayload {
  user_id: number;
  scope: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  id: number;
  name: string;
}
export interface RegisterResponse extends CustomPayload {
  data: RegisterPayload;
  message: string;
  error: boolean
}

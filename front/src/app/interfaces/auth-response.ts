import { SessionUser } from '../models/sessionUser';

export interface AuthResponse {
  success: true | false;
  token: string;
  user: SessionUser;
  msg: string;
}

import {
  Login,
  // YuRegistration,
  // YuConfirmationCode
} from '../../../models';

export interface IAuthRepository {
  login(loginModel: Login): Promise<any>;
  logout(): Promise<any>;
  isLoggedIn(): boolean;
  // register(rm: YuRegistration): Promise<any>;
  // confirmRegistration(confirmation: YuConfirmationCode): Promise<any>;
}

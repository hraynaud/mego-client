import {
  YuLogin,
  YuRegistration,
  YuConfirmationCode
} from "@/core/models/domain";

export interface YuAuthService {
  login(loginModel: YuLogin): Promise<any>;
  register(registrationModel: YuRegistration): Promise<any>;
  confirmRegistration(code: YuConfirmationCode): Promise<any>;
  logout(): Promise<any>;
  isLoggedIn(): boolean;
}

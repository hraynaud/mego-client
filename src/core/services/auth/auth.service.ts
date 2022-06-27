import { IAuthService } from '../../interfaces';
import {
  YuConfirmationCode,
  YuLogin,
  YuRegistration,
} from '@/core/models/domain';
import { YuAuthRepository } from '@/core/contracts/repositories';

export class AuthService implements IAuthService {
  constructor(private authRepo: YuAuthRepository) {}

  register(rm: YuRegistration): Promise<any> {
    return this.authRepo.register(rm);
  }
  confirmRegistration(code: YuConfirmationCode): Promise<any> {
    return this.authRepo.confirmRegistration(code);
  }

  public login(lm: YuLogin) {
    return this.authRepo.login(lm);
  }

  public logout() {
    return this.authRepo.logout();
  }

  public isLoggedIn() {
    return this.authRepo.isLoggedIn();
  }
}

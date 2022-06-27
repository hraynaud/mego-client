import { YuSessionStorageRepository } from "@/core/contracts/repositories";
import { YuSessionStoragService } from "@/core/contracts/services/auth/yu-session-storage-service.contract";
import { YuSessionUser } from "@/core/models/domain";

export class SessionService implements YuSessionStoragService {
  constructor(private sessionStorageRepo: YuSessionStorageRepository) {}

  create(token: string, user: YuSessionUser): void {
    this.sessionStorageRepo.addSessionKeys(token, user);
  }
  getUser(): YuSessionUser {
    return this.sessionStorageRepo.getUserFromSession();
  }

  hasSession(): boolean {
    return this.sessionStorageRepo.hasSession();
  }
  sessionIsValid(): boolean {
    return this.sessionStorageRepo.sessionIsValid();
  }
  clear(): Promise<any> {
    return this.sessionStorageRepo.removeSessionKeys();
  }
}

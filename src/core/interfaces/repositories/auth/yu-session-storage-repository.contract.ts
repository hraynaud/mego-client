import { YuSessionUser } from "@/core/models/domain/yu-session-user.model";

export interface YuSessionStorageRepository {
  hasSession(): boolean;
  removeSessionKeys(): Promise<any>;
  addSessionKeys(token: string, user: YuSessionUser): void;
  getUserFromSession(): YuSessionUser;
  sessionIsValid(): boolean;
}

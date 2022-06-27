import { YuSessionUser } from "@/core/models/domain/yu-session-user.model";

export interface YuSessionStoragService {
  hasSession(): boolean;
  create(token: string, user: YuSessionUser): void;
  getUser(): YuSessionUser;
  sessionIsValid(): boolean;
  clear(): Promise<any>;
}

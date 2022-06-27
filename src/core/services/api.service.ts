import { YuApiRepository } from "../contracts/repositories";

export class ApiService {
  constructor(private apiRepo: YuApiRepository) {}

  

  public get(path: string) {
    return this.apiRepo.get(path);
  }

  public post(path: string, payload = {}) {
    return this.apiRepo.post(path, payload);
  }
  public put(path: string, payload = {}) {
    return this.apiRepo.put(path, payload);
  }

  del(path: string) {
    return this.apiRepo.del(path);
  }

  patch(path: string, payload: any) {
    return this.apiRepo.patch(path, payload);
  }
}

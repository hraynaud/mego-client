export interface YuApiService {
  post(path: string, payload: any): Promise<any>;
  put(path: string, payload: any): Promise<any>;
  get(path: string): Promise<any>;
  del(path: string): Promise<any>;
  patch(path: string, payload: any): Promise<any>;
}

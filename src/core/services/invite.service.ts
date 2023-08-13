import { InviteFormModel } from '../models';
import { apiService } from './api.service';

const list = (params: any): any => {
  return apiService.get('/invites', params);
};

const create = (invite: InviteFormModel) => {
  apiService.post('/invites', invite);
};

const del = (id: string | number, params: any) => {
  return apiService.del(`/invite/${id}`, params);
};

export const inviteService = {
  create,
  del,
  list,
};

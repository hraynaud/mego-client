import { PersonFormModel } from '../models';
import { apiService } from './api.service';

const list = async (params?: any): any => {
  const res = await apiService.get('/contacts', params);
  return res.data.data;
};

const create = (contact: PersonFormModel) => {
  apiService.post('/contacts', contact);
};

const del = () => {
  console.log('delete contact');
};

const update = () => {
  // should only update relationship status with contact and nothing
  console.log('update contact');
};

export const contactService = {
  list,
  create,
  del,
  update,
};

import { PersonFormModel } from '../models';
import { apiService } from './api.service';

const getContacts = (params?: any): any => {
  return apiService.get('/contacts', params);
};

const newContact = (contact: PersonFormModel) => {
  apiService.post('/contacts', contact);
};

const deleteContact = () => {
  console.log('delete contact');
};

const updateContact = () => {
  // should only update relationship status with contact and nothing
  console.log('update contact');
};

export const contactService = {
  getContacts,
  newContact,
  deleteContact,
  updateContact,
};

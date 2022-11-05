import { PersonModel } from '../models';
import { apiService } from './api.service';
interface formPerson {
  person: PersonModel;
}

// const searchPersons = (params: any | undefined): any => {
//   return apiService.post('/persons_search', params);
// };

const getFriends = (params: any | undefined): any => {
  return apiService.get('/persons', params);
};

const newPerson = (person: formPerson) => {
  apiService.post('/persons', person);
};

const deletePerson = () => {
  console.log('delete person');
};

const updatePerson = () => {
  console.log('update person');
};

export const peopleService = {
  newPerson,
  deletePerson,
  updatePerson,
  getFriends,
};

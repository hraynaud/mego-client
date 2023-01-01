import { PersonModel } from '../../models';
import { apiService } from '../api.service';
interface formPerson {
  person: PersonModel;
}

// const searchPersons = (params: any | undefined): any => {
//   return apiService.post('/persons_search', params);
// };

const relationships = (params: any | undefined): any => {
  return apiService.get(`/user_relationships/${params['group']}`, params);
};

const findPerson = (id: string): any => {
  return apiService.get(`/people/${id}`);
};

const newPerson = (person: formPerson) => {
  apiService.post('/people', person);
};
('');

const deletePerson = () => {
  console.log('delete person');
};

const updatePerson = () => {
  console.log('update person');
};

export const peopleApi = {
  newPerson,
  findPerson,
  deletePerson,
  updatePerson,
  relationships,
};

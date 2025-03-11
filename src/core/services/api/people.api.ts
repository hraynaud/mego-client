import { PersonModel } from '../../models';
import { apiService } from '../api.service';

// const searchPersons = (params: any | undefined): any => {
//   return apiService.post('/persons_search', params);
// };

const relationships = (params: any | undefined): any => {
  return apiService.get(`/user_relationships/${params['group']}`, params);
};

const find = async (id: string): any => {
  const resp = await apiService.get(`/people/${id}`);
  return resp.data.data;
};

const create = async (person: PersonModel) => {
  return await apiService.post('/people', person);
};

const del = () => {
  console.log('delete person');
};

const update = () => {
  console.log('update person');
};

export const peopleApi = {
  create,
  find,
  del,
  update,
  relationships,
};

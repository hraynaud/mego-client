import { EndorsementFormModel } from '../models';
import { apiService } from './api.service';

const search = (params: any): any => {
  return apiService.get('/endorsements_search', params);
};

const newEndorsement = (endorsement: EndorsementFormModel) => {
  apiService.post('/endorsements', endorsement);
};

const del = (id: string | number, params: any) => {
  return apiService.del(`/endorsements/${id}`, params);
};

const update = () => {
  console.log('update endorsement');
};

export const endorsementService = {
  newEndorsement,
  del,
  update,
  search,
};

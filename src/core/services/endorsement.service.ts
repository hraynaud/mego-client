import { EndorsementFormModel } from '../models';
import { apiService } from './api.service';
import { useEndorsementStore } from 'src/stores/endorsements-store';
const store = useEndorsementStore();

const search = (params: any): any => {
  return apiService.get('/endorsements_search', params);
};

const newEndorsement = (endorsement: EndorsementFormModel) => {
  return apiService.post('/endorsements', endorsement);
};

const del = (id: string) => {
  apiService.del('/endorsements', id);
  const endorsement = store.findById(id);
  console.log('deleting from store: ', JSON.stringify(endorsement));
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

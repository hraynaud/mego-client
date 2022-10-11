import { EndorsementFormModel } from '../models';
import { apiService } from './api.service';

const getEndorsements = (): any => {
  return apiService.get('/endorsements');
};

const newEndorsement = (endorsement: EndorsementFormModel) => {
  apiService.post('/endorsements', endorsement);
};

const deleteEndorsement = () => {
  console.log('delete endorsement');
};

const updateEndorsement = () => {
  console.log('update endorsement');
};

export const endorsementService = {
  newEndorsement,
  deleteEndorsement,
  updateEndorsement,
  getEndorsements,
};

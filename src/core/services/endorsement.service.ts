import { Endorsement } from '../models';
import { apiService } from './api.service';
interface formEndorsement {
  endorsement: Endorsement;
}

const getEndorsements = () => {
  return apiService.get('/endorsements');
};

const newEndorsement = (endorsement: formEndorsement) => {
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

import { PersonModel } from '../models';

const buildPerson = (p: any) => {
  return new PersonModel(
    p.attributes.firstName,
    p.attributes.lasttName,
    p.attributes.neoId,
    p.attributes.incomingEndorsements,
    p.attributes.outgoingEndorsements,
    p.attributes.bio,
    p.attributes.profileImageUrl,
    p.attributes.avatarUrl
  );
};

export const peopleService = {
  buildPerson,
};

import { PersonModel } from '../models';

const buildPerson = (p: any) => {
  return new PersonModel(
    p.attributes.firstName,
    p.attributes.lastName,
    p.attributes.neoId,
    p.attributes.endorsees,
    p.attributes.endorsers,
    p.attributes.bio,
    p.attributes.profileImageUrl,
    p.attributes.avatarUrl
  );
};

export const peopleService = {
  buildPerson,
};

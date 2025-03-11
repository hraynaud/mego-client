import { PersonModel } from '../models';
import { peopleApi } from './api/people.api';

const build = <T extends { id: string; attributes: PersonModel }>(obj: T) => {
  const person = obj.attributes;
  return new PersonModel(
    obj.id,
    person.firstName,
    person.lastName,
    person.endorsees,
    person.endorsers,
    person.bio,
    person.profileImageUrl,
    person.avatarUrl
  );
};

const create = async (payload: PersonModel) => {
  try {
    return await peopleApi.create(payload);
  } catch (err) {
    return err;
  }
};
const find = async (id: string) => {
  return await peopleApi.find(id);
};

const del = () => {
  console.log('delete project');
};

const update = () => {
  console.log('update project');
};

export const peopleService = {
  build,
  find,
  create,
  del,
  update,
};

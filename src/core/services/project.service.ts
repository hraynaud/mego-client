import { ProjectModel } from '../models';
import { projectApi } from './api/project.api';
const build = <T extends { id: string; attributes: ProjectModel }>(obj: T) => {
  const proj = obj.attributes;
  return new ProjectModel(
    obj.id,
    proj.name,
    proj.description,
    proj.topicImage,
    proj.startDate,
    proj.ownerAvatarUrl,
    proj.ownerProfileImageUrl,
    proj.topicName,
    proj.progress,
    proj.openItems,
    proj.roadBlocks,
    proj.tasks
  );
};

const create = async (payload: ProjectModel) => {
  try {
    return await projectApi.create(payload);
  } catch (err) {
    return err;
  }
};

const search = async (payload: unknown) => {
  try {
    return await projectApi.search(payload);
  } catch (err) {
    return err;
  }
};

const random = async () => {
  try {
    return await projectApi.random();
  } catch (err) {
    return err;
  }
};

const find = async (id: string) => {
  return await projectApi.find(id);
};

export const projectService = {
  build,
  create,
  random,
  search,
  find,
};

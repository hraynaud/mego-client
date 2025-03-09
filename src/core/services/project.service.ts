import { ProjectModel } from '../models';
import { projectApi } from './api/project.api';
const build = <
  T extends { id: string; type: string; attributes: ProjectModel }
>(
  p: T
) => {
  const attr = p.attributes;
  return new ProjectModel(
    p.id,
    attr.name,
    attr.description,
    attr.topicImage,
    attr.startDate,
    attr.ownerAvatarUrl,
    attr.ownerProfileImageUrl,
    attr.topicName,
    attr.progress,
    attr.openItems,
    attr.roadBlocks,
    attr.tasks
  );
};

const create = async (payload: ProjectModel): Promise<unknown> => {
  try {
    return await projectApi.create(payload);
  } catch (err) {
    return await Promise.reject(err);
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
  find,
};

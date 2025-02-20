import { ProjectModel } from '../models';
import { apiService } from './api.service';
const build = (p: any) => {
  console.log('attrs', p);
  return new ProjectModel(
    p.id,
    p.attributes.name,
    p.attributes.description,
    p.attributes.topicImage,
    p.attributes.startDate,
    p.attributes.ownerAvatarUrl,
    p.attributes.ownerProfileImageUrl,
    p.attributes.topicName
  );
};

const create = (project: ProjectModel) => {
  return apiService
    .post('/projects', project)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const projectService = {
  build,
  create,
};

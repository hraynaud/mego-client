import { ProjectModel } from '../../models';
import { apiService } from '../api.service';

const search = async (payload: unknown) => {
  return apiService.extractReponseData(
    await apiService.post('/projects_search', { payload })
  );
};

const random = async () => {
  return apiService.extractReponseData(
    await apiService.post('/projects_random', {})
  );
};

const find = async (id: string) => {
  return apiService.extractReponseData(await apiService.get(`/projects/${id}`));
};

const create = async (payload: ProjectModel) => {
  return apiService.extractReponseData(
    await apiService.post('/projects', { project: payload })
  );
};

const del = () => {
  console.log('delete project');
};

const update = () => {
  console.log('update project');
};

export const projectApi = {
  find,
  create,
  del,
  update,
  search,
  random,
};

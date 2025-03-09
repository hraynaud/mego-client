import { ProjectModel } from '../../models';
import { apiService } from '../api.service';

const search = async (payload: unknown) => {
  const resp = await apiService.post('/projects_search', { payload });
  return resp.data.data;
};

const random = async () => {
  const resp = await apiService.post('/projects_random', {});
  return resp.data.data;
};

const find = async (id: string) => {
  const resp = await apiService.get(`/projects/${id}`);
  return resp.data.data;
};

const create = async (payload: ProjectModel) => {
  const resp = await apiService.post('/projects', { project: payload });
  return resp.data.data;
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

import { ProjectModel } from '../../models';
import { apiService } from '../api.service';

const search = (payload: unknown) => {
  return apiService.post('/projects_search', { payload });
};

const random = async () => {
  const resp = await apiService.post('/projects_random', {
    project: { topic_id: 123 },
  });
  return resp.data.data;
};

const find = async (id: string) => {
  const resp = await apiService.get(`/projects/${id}`);
  debugger;
  return resp.data.data;
};

const create = async (payload: ProjectModel) => {
  const resp = await apiService.post('/projects', { project: payload });
  debugger;
  return resp.data;
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

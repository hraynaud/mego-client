import { AxiosResponse } from 'axios';
import { ProjectModel } from '../../models';
import { apiService } from '../api.service';

const search = async (payload: unknown) => {
  return extractReponseData(
    await apiService.post('/projects_search', { payload })
  );
};

const random = async () => {
  return extractReponseData(await apiService.post('/projects_random', {}));
};

const find = async (id: string) => {
  return extractReponseData(await apiService.get(`/projects/${id}`));
};

const create = async (payload: ProjectModel) => {
  return extractReponseData(
    await apiService.post('/projects', { project: payload })
  );
};

const del = () => {
  console.log('delete project');
};

const update = () => {
  console.log('update project');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractReponseData = (resp: AxiosResponse<any>) => {
  return resp.data.data;
};

export const projectApi = {
  find,
  create,
  del,
  update,
  search,
  random,
};

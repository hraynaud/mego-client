import { ProjectModel } from '../../models';
import { apiService } from '../api.service';

interface formProject {
  project: ProjectModel;
}

const searchProjects = (payload = {}): any => {
  return apiService.post('/projects_search', payload);
};

const findProject = (id: string): any => {
  return apiService.get(`/projects/${id}`);
};

const newProject = (project: formProject) => {
  apiService.post('/projects', { project });
};

const deleteProject = () => {
  console.log('delete project');
};

const updateProject = () => {
  console.log('update project');
};

export const projectApi = {
  findProject,
  newProject,
  deleteProject,
  updateProject,
  searchProjects,
};

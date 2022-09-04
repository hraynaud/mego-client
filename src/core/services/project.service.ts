import { Project } from '../models';
import { apiService } from './api.service';
interface formProject {
  project: Project;
}

const getProjects = (params: any | undefined) => {
  return apiService.post('/projects/search', params);
};

const newProject = (project: formProject) => {
  apiService.post('/projects', project);
};

const deleteProject = () => {
  console.log('delete project');
};

const updateProject = () => {
  console.log('update project');
};

export const projectService = {
  newProject,
  deleteProject,
  updateProject,
  getProjects,
};

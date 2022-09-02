import { Project } from '../models';
import { apiService } from './api.service';
interface formProject {
  project: Project;
}

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
};

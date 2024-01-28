import { ProjectModel } from '../../models';
import { apiService } from '../api.service';

interface formProject {
  project: ProjectModel;
}

export interface RandomProjectsResponses {
  id?: string;
  attributes: {
    created_at?: string;
    name?: string;
    description?: string;
    start_date?: string;
    deadline?: string;
    icon?: null;
    progress?: string[];
    open_items?: string[];
    roadblocks?: string[];
    tags?: string[];
    comments?: string[];
    hero_image_url?: string;
    status?: string;
    ownerAvatarUrl?: string;
    ownerProfileImageUrl?: string;
  };
}

const searchProjects = (payload: unknown) => {
  return apiService.post('/projects_search', { payload });
};

const randomProjects = () => {
  const data = apiService.post('/projects_random', {});
  return data;
};

const findProject = (id: string): unknown => {
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
  randomProjects,
};

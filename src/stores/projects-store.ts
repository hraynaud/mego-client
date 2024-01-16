import { defineStore } from 'pinia';
import { ProjectModel } from 'src/core/models';

interface UserState {
  projectList: ProjectModel[];
}

export const useProjectStore = defineStore('projects', {
  state: (): UserState => ({
    projectList: [],
  }),
  getters: {
    projects: (state) => state.projectList,
  },
  actions: {
    initProjects(projects: Array<ProjectModel>) {
      if (projects.length == 0) return;
      this.projectList = projects;
    },
    addProject(project: ProjectModel) {
      if (!project) return;
      this.projectList.push(project);
    },
  },
});

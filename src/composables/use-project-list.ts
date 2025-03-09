import { computed } from 'vue';
import { projectService } from '../core/services';
import { useProjectStore } from 'src/stores/projects-store';

const projectStore = useProjectStore();
export function useProjectList(params: unknown) {
  const loadProjects = async () => {
    const resp = await projectService.search(params);
    if (resp) {
      setProjects(resp);
    }
  };
  const setProjects = (data: any) => {
    data.map((p: any) => {
      projects.value.push(projectService.build(p));
    });
    projectStore.initProjects(projects.value);
  };

  const projects = computed(() => {
    if (projectStore.projects.length == 0) {
      loadProjects();
    }
    return projectStore.projects;
  });

  // const getSortedData = (jsonResponse: any, data: any, key: string) => {
  //   if (jsonResponse[data])
  //     return jsonResponseHandler.setSortedData(jsonResponse, data, key);
  //   else {
  //     return [];
  //   }
  // };

  return projects;
}

import { computed } from 'vue';
import { projectApi, projecteService } from '../core/services';
import { ProjectModel } from '../core/models';
import { useProjectStore } from 'src/stores/projects-store';

// export interface ProjectSearchParams {
//   visibililty?: string;
//   depth?: number;
//   userScope?: string;
// }

const projectStore = useProjectStore();
export function useProjectList(params: any) {
  const loadProjects = () => {
    projectApi
      .searchProjects(params)
      .then((resp: any) => {
        if (resp) {
          setProjects(resp);
        }
      })
      .catch((error: any): void => {
        console.log(error);
      });
  };

  const setProjects = (resp: any) => {
    const data = resp.data.projects.data;

    data.map((p: any) => {
      projects.value.push(projecteService.buildProject(p));
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

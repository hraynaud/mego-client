import { ref, onMounted } from 'vue';
import { projectService } from '../core/services';
import { ProjectModel } from '../core/models';

export function useProjectList(params: any) {
  const projects = ref(<Array<ProjectModel>>[]);

  const loadProjects = () => {
    projectService
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
      projects.value.push(
        new ProjectModel(
          p.attributes.name,
          p.attributes.description,
          p.attributes.topicImage
        )
      );
    });
  };

  // const getSortedData = (jsonResponse: any, data: any, key: string) => {
  //   if (jsonResponse[data])
  //     return jsonResponseHandler.setSortedData(jsonResponse, data, key);
  //   else {
  //     return [];
  //   }
  // };

  onMounted(() => {
    loadProjects();
  });

  return {
    projects,
  };
}

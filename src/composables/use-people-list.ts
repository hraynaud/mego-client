import { ref, onMounted } from 'vue';
import { peopleService } from '../core/services';
import { PersonModel } from '../core/models';

export function usePeopleList(params: any) {
  const people = ref(<Array<PersonModel>>[]);

  const loadPeople = () => {
    peopleService
      .getFriends(params)
      .then((resp: any) => {
        if (resp) {
          setPeople(resp);
        }
      })
      .catch((error: any): void => {
        console.log(error);
      });
  };

  const setPeople = (resp: any) => {
    const data = resp.data.people.data;

    data.map((p: any) => {
      people.value.push(
        new p(
          p.attributes.name,
          p.attributes.description,
          p.attributes.topicImage
        ) as PersonModel
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
    loadPeople();
  });

  return {
    people,
  };
}

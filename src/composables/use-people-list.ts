import { ref, onMounted } from 'vue';
import { peopleService } from '../core/services';
import { PersonModel } from '../core/models';
import { useFriendStore } from 'src/stores/friends-store';
const userStore = useFriendStore();

export function usePeopleList(params: any) {
  const peopleTemp: PersonModel[] = [];
  const people = ref(peopleTemp);

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
    const data = resp.data.data;

    data.map((p: any) => {
      const pp = new PersonModel(
        p.attributes.firstName,
        p.attributes.lasttName,
        p.attributes.neoId,
        p.relationships.incomingEndorsements.data,
        p.relationships.outgoingEndorsements.data
      );
      people.value.push(pp);
    });
    userStore.initFriends(people.value);
  };

  // const getSortedData = (jsonResponse: any, data: any, key: string) => {
  //   if (jsonResponse[data])
  //     return jsonResponseHandler.setSortedData(jsonResponse, data, key);
  //   else {
  //     return [];
  //   }
  // };

  onMounted(() => {
    if (userStore.friends.length == 0) loadPeople();
  });

  return {
    people,
  };
}

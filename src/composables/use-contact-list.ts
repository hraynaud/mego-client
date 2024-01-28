import { ref, computed } from 'vue';
import { peopleApi, peopleService } from '../core/services';
import { PersonModel } from '../core/models';
import { useFriendStore } from 'src/stores/friends-store';
const userStore = useFriendStore();

export function useContactList(params: any) {
  const loadPeople = () => {
    peopleApi
      .relationships(params)
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
      const pp = peopleService.buildPerson(p);
      people.value.push(pp);
    });
    userStore.initFriends(people.value);
  };

  const people = computed(() => {
    if (userStore.friends.length == 0) {
      loadPeople();
    }
    return userStore.friends;
  });

  return {
    people,
  };
}

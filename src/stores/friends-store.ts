import { defineStore } from 'pinia';
import { PersonModel } from 'src/core/models';

interface UserState {
  friendList: PersonModel[];
}

export const useFriendStore = defineStore('friends', {
  state: (): UserState => ({
    friendList: [],
  }),
  getters: {
    friends: (state) => state.friendList,
  },
  actions: {
    initFriends(friends: Array<PersonModel>) {
      if (friends.length == 0) return;
      this.friendList = friends;
    },
    addFriend(friend: PersonModel) {
      if (!friend) return;
      this.friendList.push(friend);
    },
  },
});

import { defineStore } from 'pinia';
import { EndorsementModel } from 'src/core/models';

interface UserState {
  endorsementList: Array<EndorsementModel>;
}

export const useEndorsementStore = defineStore('endorsements', {
  state: (): UserState => ({
    endorsementList: [],
  }),
  getters: {
    endorsements: (state) => state.endorsementList,
  },
  actions: {
    initEndorsements(endorsements: Array<EndorsementModel>) {
      if (endorsements.length == 0) return;
      this.endorsementList = endorsements;
    },
    addEndorsement(endorsement: EndorsementModel) {
      if (!endorsement) return;
      this.endorsementList.push(endorsement);
    },
  },
});

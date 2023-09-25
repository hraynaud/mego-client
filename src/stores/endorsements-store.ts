import { defineStore } from 'pinia';
import { EndorsementPathModel } from 'src/core/models';

interface EndorsementState {
  endorsementList: Array<EndorsementPathModel>;
}

export const useEndorsementStore = defineStore('endorsements', {
  state: (): EndorsementState => ({
    endorsementList: [],
  }),
  getters: {
    endorsements: (state) => state.endorsementList,
    findById: (state) => {
      return (id: string) => {
        state.endorsementList.find((endorsement) => endorsement.id == id);
      };
    },
  },
  actions: {
    initEndorsements(endorsements: Array<EndorsementPathModel>) {
      if (endorsements.length == 0) return;
      this.endorsementList = endorsements;
    },
    addEndorsement(endorsement: EndorsementPathModel) {
      if (!endorsement) return;
      this.endorsementList.push(endorsement);
    },
  },
});

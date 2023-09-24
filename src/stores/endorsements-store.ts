import { defineStore } from 'pinia';
import { EndorsementModel } from 'src/core/models';

interface EndorsementState {
  endorsementList: Array<EndorsementModel>;
  endorsees: Array<EndorsementModel>;
  endorsers: Array<EndorsementModel>;
}

export const useEndorsementStore = defineStore('endorsements', {
  state: (): EndorsementState => ({
    endorsementList: [],
    endorsees: [],
    endorsers: [],
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

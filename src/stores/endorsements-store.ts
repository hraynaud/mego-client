import { defineStore } from 'pinia';
import { EndorsementPathModel } from 'src/core/models';

interface EndorsementState {
  endorsementList: Map<number, Array<EndorsementPathModel>>;
}

export const useEndorsementStore = defineStore('endorsements', {
  state: (): EndorsementState => ({
    endorsementList: new Map(),
  }),
  getters: {
    endorsements: (state) => {
      return (page: number) => {
        return state.endorsementList.get(page);
      };
    },
    findById: (state) => {
      return (id: string) => {
        // state.endorsementList.find((endorsement) => endorsement.id == id);
      };
    },
  },
  actions: {
    setEndorsements(page: number, endorsements: Array<EndorsementPathModel>) {
      if (endorsements.length == 0) return;
      this.endorsementList.set(page, endorsements);
    },
    addEndorsement(endorsement: EndorsementPathModel) {
      if (!endorsement) return;
      // this.endorsementList.push(endorsement);
    },
  },
});

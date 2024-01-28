import { defineStore } from 'pinia';
import { EndorsementModel } from 'src/core/models';

interface ProfileState {
  endorseeList: EndorsementModel[];
  endorserList: EndorsementModel[];
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    endorseeList: [],
    endorserList: [],
  }),

  getters: {
    endorsees: (state) => state.endorseeList,
    endorsers: (state) => state.endorserList,
  },

  actions: {
    initEndorsements(
      endorsers: EndorsementModel[],
      endorsees: EndorsementModel[]
    ) {
      this.endorserList = endorsers;
      this.endorseeList = endorsees;
    },
    addEndorsee(endorsee: EndorsementModel) {
      if (!endorsee) return;
      this.endorsees.push(endorsee);
    },
    addEndorser(endorser: EndorsementModel) {
      if (!endorser) return;
      this.endorsers.push(endorser);
    },
    removeEndorsee(endorsee: EndorsementModel) {
      if (!endorsee) return;
      this.endorseeList = this.endorseeList.filter((e) => e.id != endorsee.id);
    },
    removeEndorser(endorser: EndorsementModel) {
      if (!endorser) return;
      this.endorsees.filter((e) => e.id == endorser.id);
    },
  },
});

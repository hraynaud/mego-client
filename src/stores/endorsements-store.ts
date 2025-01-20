import { defineStore } from 'pinia';
import { EndorsementPathModel } from 'src/core/models';
import { endorsementService } from 'src/core/services';

interface EndorsementState {
  endorsementList: Map<number, EndorsementPathModel[]>;
  query?: string;
  hops?: number;
  tolerance?: number;
  topicId?: string;
  topicName?: string;
}

export interface SearchParams {
  page?: number;
  query?: string;
  hops?: number;
  tolerance?: number;
  topicId?: string;
  topicName?: string;
}

export const useEndorsementStore = defineStore('endorsements', {
  state: (): EndorsementState => ({
    endorsementList: new Map(),
  }),
  getters: {
    endorsements: (state) => {
      // return (page: number) => {
      return state.endorsementList.get(1) ?? [];
      // };
    },
    findById: (state) => {
      //TODO restore endorsement by id to laod endorsement view page.
      return (id: string) => {
        // state.endorsementList.find((endorsement) => endorsement.id == id);
      };
    },
  },
  actions: {
    loadEndorsements(params: SearchParams, page: number) {
      endorsementService
        .search(params)
        .then((res: any) => {
          if (res) {
            const endorsements: EndorsementPathModel[] = [];
            res.data.data.map((e: any) => {
              endorsements.push(
                new EndorsementPathModel(
                  e.id,
                  e.attributes.topic,
                  e.attributes.description,
                  e.attributes.endorseeProfileImageUrl,
                  e.attributes.endorseeName,
                  e.attributes.path
                )
              );
            });
            this.setEndorsements(page, endorsements);
          }
        })
        .catch((error: any): void => {
          console.log(error);
        });
    },
    setEndorsements(page: number, endorsements: EndorsementPathModel[]) {
      if (endorsements.length == 0) return;
      this.endorsementList.set(page, endorsements);
    },
    addEndorsement(endorsement: EndorsementPathModel) {
      if (!endorsement) return;
      // this.endorsementList.push(endorsement);
    },
  },
});

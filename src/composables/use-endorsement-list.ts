import { computed } from 'vue';
import { endorsementService } from '../core/services';
import { EndorsementPathModel } from '../core/models';
import {
  SearchParams,
  useEndorsementStore,
} from 'src/stores/endorsements-store';
const eStore = useEndorsementStore();

export function useEndorsementsList(params: SearchParams) {
  const page = params['page'] || 1;
  console.log('page is: ', params);

  return computed(() => {
    if (eStore.endorsements(page) == undefined) loadEndorsements(params, page);
    return eStore.endorsements(page) || [];
  });
}

const loadEndorsements = (params: SearchParams, page: number) => {
  // eslint-disable-next-line quotes
  endorsementService
    .search(params)
    .then((res: any) => {
      if (res) {
        return setEndorsements(page, res);
      }
    })
    .catch((error: any): void => {
      console.log(error);
    });

  const setEndorsements = (page: number, resp: any) => {
    //TODO why is the response object different from projects and endorsement?

    const endorsements: EndorsementPathModel[] = [];
    resp.data.data.map((e: any) => {
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
    eStore.setEndorsements(page, endorsements);
  };
};

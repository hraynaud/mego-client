import { computed } from 'vue';
import { endorsementService } from '../core/services';
import { EndorsementPathModel } from '../core/models';
import { useEndorsementStore } from 'src/stores/endorsements-store';
const endorsementStore = useEndorsementStore();
interface searchParams {
  page: number;
}
export function useEndorsementsList(params: searchParams) {
  loadEndorsements(params);
  return computed(() => {
    return endorsementStore.endorsements(params['page']);
  });
}

const loadEndorsements = (params: searchParams) => {
  // eslint-disable-next-line quotes
  endorsementService
    .search(params)
    .then((res: any) => {
      if (res) {
        return setEndorsements(params['page'], res);
      }
    })
    .catch((error: any): void => {
      console.log(error);
    });

  const setEndorsements = (page: number, resp: any) => {
    //TODO why is the response object different from projects and endorsement?
    const data = resp.data.data;
    const endorsements: EndorsementPathModel[] = [];
    data.map((e: any) => {
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
    endorsementStore.setEndorsements(page, endorsements);
  };
};

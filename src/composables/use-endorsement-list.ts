import { computed } from 'vue';
import { endorsementService } from '../core/services';
import { EndorsementPathModel } from '../core/models';
import { useEndorsementStore } from 'src/stores/endorsements-store';
const endorsementStore = useEndorsementStore();

export function useEndorsementsList(params = {}) {
  const loadEndorsements = () => {
    // eslint-disable-next-line quotes
    endorsementService
      .search(params)
      .then((res: any) => {
        if (res) {
          return setEndorsements(res);
        }
      })
      .catch((error: any): void => {
        console.log(error);
      });
  };

  const setEndorsements = (resp: any) => {
    //TODO why is the response object different from projects and endorsement?
    const data = resp.data.data;
    data.map((e: any) => {
      endorsements.value.push(
        new EndorsementPathModel(
          e.id,
          e.attributes.topic,
          e.attributes.description,
          e.attributes.endorseeProfileImageUrl,
          e.attributes.path
        )
      );
    });
    endorsementStore.initEndorsements(endorsements.value);
  };

  const endorsements = computed(() => {
    if (endorsementStore.endorsements.length == 0) {
      loadEndorsements();
    }
    return endorsementStore.endorsements;
  });

  return {
    endorsements,
  };
}

import { ref } from 'vue';
import { endorsementService } from '../core/services';
import { EndorsementModel } from '../core/models';
import { useEndorsementStore } from 'src/stores/endorsements-store';
const endorsementStore = useEndorsementStore();

export function useEndorsementsList(params = {}) {
  const endorsements = ref(<Array<EndorsementModel>>[]);

  const loadEndorsements = () => {
    // eslint-disable-next-line quotes
    endorsementService.getEndorsements(params).then((res: any) => {
      if (res) {
        return setEndorsements(res);
      }
    });
  };

  const setEndorsements = (resp: any) => {
    console.log('endorsement response', resp);
    //TODO why is the response object different from projects and endorsement?
    const data = resp.data.data;

    data.map((e: any) => {
      endorsements.value.push(
        new EndorsementModel(
          e.attributes.description,
          e.attributes.topic,
          e.attributes.topicImage,
          e.id
        )
      );
    });
    endorsementStore.initEndorsements(endorsements.value);
  };

  const getEndorsements = () => {
    if (endorsementStore.endorsements.length == 0) {
      loadEndorsements();
    }
    return endorsementStore.endorsements;
  };

  return {
    getEndorsements,
  };
}

import { ref, onMounted } from 'vue';
import { endorsementService } from '../core/services';
import { EndorsementModel } from '../core/models';

export function useEndorsementsList() {
  const endorsements = ref(<Array<EndorsementModel>>[]);

  const loadEndorsements = () => {
    // eslint-disable-next-line quotes
    endorsementService.getEndorsements().then((res: any) => {
      if (res) {
        const data = res.data.data;
        return populateEndorsements(data);
      }
    });
  };

  const populateEndorsements = (data: any) => {
    return data.map((e: any) => {
      endorsements.value.push(
        new EndorsementModel(
          e.attributes.description,
          e.attributes.topic,
          e.attributes.topicImage
        )
      );
    });
  };

  onMounted(() => {
    loadEndorsements();
  });

  return {
    endorsements,
  };
}

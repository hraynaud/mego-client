import { EndorsementModel } from '../core/models';
import { inject } from 'vue';
import { useQuasar } from 'quasar';
import { endorsementService } from 'src/core/services';
import { useProfileStore } from 'src/stores/profile-store';

export function useEndorsementEvent(params = {}) {
  const $q = useQuasar();
  const profileStore = useProfileStore();

  const bus = inject('bus');
  bus.on(
    'delete-endorsement',
    (endorsement: EndorsementModel, index: number) => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this endorsement homie?',
        cancel: true,
        persistent: false,
      })
        .onOk(() => {
          endorsementService.del(endorsement.id);
          profileStore.removeEndorsee(endorsement);
        })
        .onCancel(() => {
          console.log('cancel called');
        })
        .onDismiss(() => {
          console.log('I am triggered on both OK and Cancel');
        });
    },
    true
  );
}

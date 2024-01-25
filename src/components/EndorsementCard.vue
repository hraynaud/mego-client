<template>
  <q-card class="endorsement-card">
    <q-card-section avatar>
      <div class="endorsement-topic text-h6 text-center q-mb-xs">
        {{ e?.topic }}
      </div>

      <user-avatar :data="avatarData" class="small" />

      <div class="q-pa-sm endorsement-description">
        {{ e?.description }}
      </div>
      <q-separator />
      <q-bar class="row justify-end">
        <q-btn
          v-if="deleteable"
          class="col-3"
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click="deleteMe(e!, idx!)"
        />
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="launch"
          color="primary"
          @click="bar2 = true"
        />
      </q-bar>
    </q-card-section>

    <!-- @click.prevent.once="bus.emit('delete-endorsement', e, idx)" -->
  </q-card>

  <q-dialog
    v-model="bar2"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="network_wifi" />
        <q-icon name="network_cell" />
        <q-icon name="battery_full" />
        <div>9:34</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-none">
        {{ e?.description }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
//  import bus from '../core/utils/event-bus';
import { inject, computed, ref } from 'vue';
import { EndorsementModel } from '../core/models';
import UserAvatar, { AvatarData } from '../components/UserAvatar.vue';
const bus = inject('bus');
const props = defineProps<{
  e: EndorsementModel;
  idx: number;
  role: string;
  deleteable: boolean;
}>();

const bar2 = ref(false);

const deleteMe = (e: EndorsementModel, i: number) => {
  bus.emit('delete-endorsement', e, i);
};

const avatarData = computed(() => {
  return <AvatarData>{
    imgUrl:
      props.role == 'endorsee'
        ? props.e?.endorseeAvatarUrl
        : props.e?.endorserAvatarUrl,
    isVisible:
      (props.e?.endorseeAvatarUrl || props.e?.endorserAvatarUrl) ==
      'anonymous.png'
        ? false
        : true,
    icon: props.role == 'endorsee' ? 'psychology' : 'psychology_alt',
    tooltip: false,
    name:
      props.role == 'endorsee' ? props.e?.endorseeName : props.e?.endorserName,
  };
});
</script>

<style lang="scss" scoped>
.endorsement-card {
  width: 200px;
  height: 240px;
  padding: 0px;
  border-radius: 8px;
}

.endorsement-card .q-card__section--vert {
  padding: 0px;
}
.q-separator {
  margin-top: 5px;
}
.qb-bar {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.endorsement-topic {
  font-weight: 100;
  background-color: $secondary;
  padding-top: 4%;
  padding-bottom: 10%;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 65px;
}

.endorsement-description {
  height: 85px;
  overflow-y: scroll;
}
</style>

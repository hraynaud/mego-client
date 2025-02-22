<template>
  <q-card class="endorsement-card expandable" @click="expando($event)">
    <q-card-section avatar>
      <div class="topic text-h6 text-center q-mb-xs">
        {{ e?.topic }}
      </div>
      <div class="text-center card-header">
        <user-avatar :data="avatarData" cls="small" />
      </div>
      <div class="q-pa-sm description">
        {{ e?.description }}
      </div>

      <q-card-actions class="row justify-end">
        <q-btn
          v-if="deleteable"
          class="col-3"
          size="12px"
          flat
          dense
          round
          icon="delete"
          @click="deleteMe(e!, idx!, $event)"
        />
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="keyboard_arrow_down"
          color="primary"
          class="arrow-down"
        />
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="keyboard_arrow_up"
          color="primary"
          class="arrow-up"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
//  import bus from '../core/utils/event-bus';
import { inject, computed, ref } from 'vue';
import { EndorsementModel } from '../../core/models';
import UserAvatar, { AvatarData } from './UserAvatar.vue';
const bus = inject('bus');
const props = defineProps<{
  e: EndorsementModel;
  idx: number;
  role: string | undefined;
  deleteable: boolean;
}>();

const deleteMe = (e: EndorsementModel, i: number, event: any) => {
  event.stopImmediatePropagation();

  bus.emit('delete-endorsement', e, i);
};

const expando = (event: any) => {
  event.stopImmediatePropagation();
  const el = event?.currentTarget;
  el.classList.toggle('expanded');
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

<style lang="scss">
@import '../../css/endorsement-card.scss';
</style>

<style lang="scss" scoped>
.endorsement-card {
  width: 200px;
  height: 240px;

  .topic {
    height: 65px;
  }
  .description {
    height: 85px;
    overflow-y: scroll;
  }
}
</style>

<template>
  <q-card class="endorsement-card" @click="expando($event)">
    <q-card-section avatar>
      <div class="endorsement-topic text-h6 text-center q-mb-xs">
        {{ e?.topic }}
      </div>

      <user-avatar :data="avatarData" class="small" />

      <div class="q-pa-sm endorsement-description">
        {{ e?.description }}
      </div>
      <!-- <q-separator /> -->
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
        <q-btn size="12px" flat dense round icon="launch" color="primary" />
      </q-card-actions>
    </q-card-section>

    <!-- @click.prevent.once="bus.emit('delete-endorsement', e, idx)" -->
  </q-card>

  <q-dialog
    v-model="bar2"
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card class="">
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

const deleteMe = (e: EndorsementModel, i: number, event: any) => {
  event.stopImmediatePropagation();

  bus.emit('delete-endorsement', e, i);
};

const expando = (event: any) => {
  event.stopImmediatePropagation();
  const el = event?.currentTarget;
  el.classList.toggle('expanded');
  debugger;
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
  &.expanded {
    height: 100%;
    .endorsement-description {
      height: 100%;
    }
  }
  .endorsement-description {
    height: 85px;
    overflow-y: scroll;
  }
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
</style>

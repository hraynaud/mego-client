<template>
  <q-card class="endorsement-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="avatar()" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ e?.topic }}</q-item-label>
      </q-item-section>
    </q-item>

    <!-- <img :src="`/images/${e.topicImage}`" /> -->

    <q-card-section> {{ e?.description }} </q-card-section>

    <q-btn
      v-if="deleteable"
      class="gt-xs float-right"
      size="12px"
      flat
      dense
      round
      icon="delete"
      @click="deleteMe(e!, idx!)"
    />
    <!-- @click.prevent.once="bus.emit('delete-endorsement', e, idx)" -->
  </q-card>
</template>

<script setup lang="ts">
// import bus from '../core/utils/event-bus';
import { inject } from 'vue';
import { EndorsementModel } from '../core/models';
const bus = inject('bus');
const props = defineProps({
  e: EndorsementModel,
  idx: Number,
  displayType: String,
  deleteable: Boolean,
});

const avatar = () => {
  return props.displayType == 'endorsee'
    ? props.e?.endorseeAvatarUrl
    : props.e?.endorserAvatarUrl;
};

const deleteMe = (e: EndorsementModel, i: number) => {
  bus.emit('delete-endorsement', e, i);
};
</script>

<style lang="scss">
.endorsement-card {
  width: 30%;
  // max-width: 250px;
}
</style>

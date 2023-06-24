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
        <!-- <q-item-label caption>Subhead</q-item-label> -->
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
      @click="bus.emit('delete-endorsement', e, idx)"
    />
  </q-card>
</template>

<script setup lang="ts">
import { inject, toRefs } from 'vue';
import { EndorsementModel } from '../core/models';
import bus from '../core/utils/event-bus';
const deleteable = inject('deleteable', false);

const props = defineProps({
  e: EndorsementModel,
  idx: Number,
  displayType: String,
});
// const { e, displayType } = toRefs(props);

const avatar = () => {
  debugger;
  return props.displayType == 'endorser'
    ? props.e?.endorseeAvatarUrl
    : props.e?.endorserAvatarUrl;
};
</script>

<style lang="scss">
.endorsement-card {
  width: 100%;
  max-width: 250px;
}
</style>

<template>
  <q-card class="endorsement-card">
    <q-card-section avatar>
      <div class="endorsement-topic text-h6 text-center q-mb-xs">
        {{ e?.topic }}
      </div>

      <UserAvatar :e="e" :displayType="displayType" />

      <div class="q-pa-sm endorsement-description">
        {{ e?.description }}
      </div>
      <q-separator />
      <q-card-section class="row justify-end">
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
      </q-card-section>
    </q-card-section>

    <!-- @click.prevent.once="bus.emit('delete-endorsement', e, idx)" -->
  </q-card>
</template>

<script setup lang="ts">
// import bus from '../core/utils/event-bus';
import { inject, computed } from 'vue';
import { EndorsementModel } from '../core/models';
import UserAvatar from '../components/UserAvatar.vue';

const bus = inject('bus');
const props = defineProps({
  e: EndorsementModel,
  idx: Number,
  displayType: String,
  deleteable: Boolean,
});

const deleteMe = (e: EndorsementModel, i: number) => {
  bus.emit('delete-endorsement', e, i);
};
</script>

<style lang="scss" scoped>
.endorsement-card {
  width: 200px;
  height: 225px;
  padding: 0px;
  border-radius: 8px;
}

.endorsement-card .q-card__section--vert {
  padding: 0px;
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
}

.anon {
  background-color: $tertiary;
  color: darkslategrey;
  font-weight: bold;
  font-size: 3em;
}
</style>

<template>
  <div class="text-center endorsee-hdr">
    <q-avatar class="avatar" v-if="isVisible">
      <img :src="avatar" />
    </q-avatar>
    <q-avatar v-else icon="psychology" class="avatar anon profile"> </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EndorsementModel } from '../core/models';

const props = defineProps({
  e: EndorsementModel,
  displayType: String,
});

const avatar = computed(() => {
  return props.displayType == 'endorsee'
    ? props.e?.endorseeAvatarUrl
    : props.e?.endorserAvatarUrl;
});

const isVisible = computed(() =>
  (props.e?.endorserAvatarUrl || props.e?.endorseeAvatarUrl) == 'anonymous.png'
    ? false
    : true
);
</script>

<style lang="scss" scoped>
.endorsee-hdr {
  margin-top: -1.95rem;

  .avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 2%;
    margin-top: 1%;
  }
}

.anon {
  background-color: $tertiary;
  color: darkslategrey;
  font-weight: bold;
  font-size: 3em;
}
</style>

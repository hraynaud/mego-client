<template>
  <q-card class="endorsement-path-card">
    <q-card-section>
      <div class="endorsement-path-card-topic text-center q-mb-sm">
        {{ e?.topic }}
      </div>

      <user-avatar :data="avatarLargeData" class="mini" />

      <div class="q-pa-sm endorsement-path-card-description">
        {{ e?.description }}
      </div>
    </q-card-section>
    <q-card-section>
      <endorsement-path :path="e?.path" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { EndorsementPathModel } from '../core/models';
import UserAvatar from '../components/UserAvatar.vue';
import EndorsementPath from '../components/EndorsementPath.vue';
import { AvatarData } from '../components/UserAvatar.vue';

const props = defineProps<{
  e: EndorsementPathModel;
  idx: number;
}>();

const avatarLargeData = <AvatarData>(<unknown>{
  imgUrl: props.e?.endorseeProfileImageUrl,
  isVisible: props.e?.endorseeProfileImageUrl == 'anonymous.png' ? false : true,
  icon: 'psychology',
  tooltip: false,
  name: props.e?.endorseeName,
});
</script>

<style lang="scss">
@import '../css/endorsement-path-card.scss';
</style>

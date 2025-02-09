<template>
  <q-card class="endorsement-card">
    <q-card-section>
      <div class="topic text-center q-mb-sm">
        {{ e?.topic }}
      </div>
      <div class="text-center card-header">
        <user-avatar :data="avatarLargeData" cls="mini" />
      </div>

      <div class="q-pa-sm description">
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
@import '../css/endorsement-card.scss';
</style>
<style lang="scss" scoped>
.endorsement-card {
  width: 230px;
  height: 300px;
  .topic {
    height: 65px;
  }
  .description {
    height: 125px;
  }
}
</style>

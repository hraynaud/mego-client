<template>
  <q-card class="endorsement-card">
    <q-card-section>
      <div class="endorsement-topic text-h3 text-center q-mb-sm">
        {{ e?.topic }}
      </div>

      <user-avatar :data="avatarLargeData" class="large" />

      <div class="q-pa-md endorsement-description">
        {{ e?.description }}
      </div>
    </q-card-section>
    <endorsement-path :path="e?.path" />
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

<style lang="scss" scoped>
.endorsement-card {
  width: 460px;
  height: 500px;
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
  height: 175px;
}

.endorsement-description {
  height: 150px;
}
</style>

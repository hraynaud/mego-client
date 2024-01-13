<template>
  <q-card class="endorsement-card">
    <q-card-section>
      <div class="endorsement-topic text-h3 text-center q-mb-sm">
        {{ e?.topic }}
      </div>

      <user-avatar-large :e="e" :data="avatarLargeData" class="large" />

      <div class="q-pa-md endorsement-description">
        {{ e?.description }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="row items-center">
      <div class="q-py-md path">
        <router-link
          v-for="p in path"
          :key="p.id"
          :to="profilePath(p.id)"
          class="path-el"
        >
          <user-avatar :p="p" class="path-el-content small" />
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EndorsementPathModel } from '../core/models';
import { RouterLink } from 'vue-router';
import UserAvatar from '../components/UserAvatar.vue';
import UserAvatarLarge from '../components/UserAvatarLarge.vue';
import { AvatarData } from '../components/UserAvatarLarge.vue';

const profilePath = (id: string) => `/person/${id}`;

const props = defineProps({
  e: EndorsementPathModel,
  idx: Number,
});

const avatarLargeData = <AvatarData>{
  imgUrl: props.e?.endorseeProfileImageUrl,
  isVisible: props.e?.endorseeProfileImageUrl == 'anonymous.png' ? false : true,
  icon: 'psychology',
  role: 'endorsee',
};

const path = computed(() => props.e?.path);
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
  height: 175px;
}

.path {
  height: 80px;
  min-width: 160px;
  position: relative;
  padding: 15px;
  .path-el-content {
    display: inline;
  }

  .path-el:not(:last-child) {
    margin-right: 27px;
    position: relative;
  }

  .path-el:not(:last-child):after {
    position: absolute;
    content: '';
    left: 61px;
    top: 0%;
    width: 25px;
    height: 11px;
    border-bottom: 2px solid black;
  }
}
</style>

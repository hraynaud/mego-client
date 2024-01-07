<template>
  <q-card class="endorsement-card">
    <q-card-section>
      <div class="endorsement-topic text-h3 text-center q-mb-sm">
        {{ e?.topic }}
      </div>
      <div class="text-center endorsee-hdr">
        <q-avatar
          class="avatar"
          v-if="e?.endorseeProfileImageUrl != 'anonymous.png'"
        >
          <img :src="e?.endorseeProfileImageUrl" />
        </q-avatar>
        <q-avatar v-else icon="psychology" class="avatar anon profile">
        </q-avatar>
      </div>

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
          <user-avatar :p="p" :style="'visible:true'"></user-avatar>
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
const props = defineProps({
  e: EndorsementPathModel,
  idx: Number,
});

const path = computed(() => props.e?.path);
const profilePath = (id: string) => `/person/${id}`;
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

.endorsee-hdr {
  margin-top: -6.75rem;

  .avatar {
    height: 125px;
    width: 125px;
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

.anon.profile {
  font-size: 242px;
  border: 1px solid;
  border-radius: 50%;
}

.endorsement-description {
  height: 175px;
}

.path {
  height: 80px;
  min-width: 160px;
  position: relative;
  padding: 15px;
  .user-avatar {
    display: inline;
  }
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
</style>

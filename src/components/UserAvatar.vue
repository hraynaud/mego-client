<template>
  <div class="text-center">
    <q-avatar class="avatar" v-if="data.isVisible">
      <img :src="data.imgUrl" />
    </q-avatar>
    <q-avatar v-else :icon="data.icon" class="avatar anon icon"> </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { AvatarData } from '../components/UserAvatarLarge.vue';

defineProps<{
  data: AvatarData;
}>();
</script>

<style lang="scss" scoped>
.small {
  margin-top: -1.95rem;

  .avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 2%;
    margin-top: 1%;
    font-size: 120px;
  }
}
.anon {
  background-color: $tertiary;
  color: darkslategrey;
  font-weight: bold;
}
.icon {
  border: 1px solid;
  border-radius: 50%;
}
</style>

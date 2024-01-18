<template>
  <div class="text-center">
    <q-avatar class="avatar" v-if="data.isVisible">
      <img :src="data.imgUrl" />
    </q-avatar>
    <q-avatar v-else :icon="data.icon" class="avatar anon icon"> </q-avatar>

    <q-tooltip
      v-if="data.tooltip"
      class="text-primary transparent text-weight-bold text-subtitle2"
    >
      {{ data.name }}
    </q-tooltip>
    <div v-if="data.tooltip == false" style="font-size: 10px; color: $primary">
      {{ data.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
export interface AvatarData {
  imgUrl: string | undefined;
  isVisible: boolean;
  icon: string;
  tooltip: boolean;
  name?: string;
}

defineProps<{
  data: AvatarData;
}>();
</script>

<style lang="scss" scoped>
.tip {
  background-color: aqua;
  padding: 0px;
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

.large {
  margin-top: -4.75rem;
  &.profile {
    margin: 0px;
  }

  .avatar {
    height: 125px;
    width: 125px;
    margin-bottom: 2%;
    margin-top: 1%;
  }

  .icon {
    font-size: 242px;
  }
}
</style>

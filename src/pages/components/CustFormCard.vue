<template>
  <q-form class="q-pa-xl row">
    <q-card class="col-7 form-card offset-md-1">
      <div class="header text-center q-mb-sm">
        <slot name="header"></slot>
      </div>
      <div class="text-center card-header">
        <thing-avatar :data="avatarData" cls="large project" />
      </div>

      <q-card-section>
        <slot></slot>
      </q-card-section>
      <q-card-actions align="right" class="q-py-sm">
        <q-btn label="Submit" type="submit" color="primary" flat no-caps />
        <q-btn label="Cancel" color="primary" flat class="q-ml-sm" no-caps />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import ThingAvatar, {
  ThingAvatarData,
} from 'src/pages/components/ThingAvatar.vue';

const props = defineProps<{
  icon: string;
  cls?: string;
}>();

const avatarData: ThingAvatarData = {
  icon: props.icon,
  imgUrl: undefined,
  role: undefined,
};
</script>

<style lang="scss" scoped>
.form-card {
  border-radius: 8px;
}

.header {
  font-weight: 300;
  padding-top: 4%;
  height: 155px;
  font-size: 2.125em;
  color: white;
  background-color: $secondary;
}
</style>

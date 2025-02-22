<template>
  <PopupForm :data="headerData">
    <CustQInput
      v-model="topic.name"
      label="Name"
      :rules="[(val) => !!val || 'First name is required']"
    />
    <CustQInput
      v-model="topic.description"
      type="textarea"
      label="Description"
      :rules="[
        (val) => (val && val.length > 0) || 'Please enter an description',
      ]"
    />
  </PopupForm>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import { TopicFormModel } from '../../core/models';
import CustQInput from 'src/pages/components/custom/CustQInput.vue';
import PopupForm, { HeaderData } from 'src/pages/components/PopupForm.vue';

const topic = defineModel<TopicFormModel>({
  default: () => ({}),
});

const headerData: HeaderData = {
  icon: 'label',
  header: 'Add Topic',
};
</script>

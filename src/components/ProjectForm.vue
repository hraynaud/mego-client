<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Project Name*"
        hint="Something catchy :-)"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        type="textarea"
        filled
        v-model="description"
        label="Description"
        hint=""
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div class="q-gutter-md row full-width">
        <q-input
          class="col"
          v-model="startDate"
          filled
          type="date"
          hint="start date"
          stack-label
          label="hello"
        />
        <q-input
          class="col"
          v-model="deadline"
          filled
          type="date"
          hint="deadline"
          stack-label
          label="hello"
        />
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const description = ref(null);
    const startDate = ref(null);
    const deadline = ref();
    const topic = ref();

    return {
      name,
      description,
      startDate,
      deadline,
      topic,

      onSubmit() {},

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<template>
  <q-card>
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">Project Details</h4>
    </q-card-section>
    <div class="q-pa-md project-form">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-px-sm q-pt-xl q-pb-lg"
        name="project"
      >
        <div class="row q-pb-lg">
          <div class="col-12">
            <q-input
              type="textarea"
              v-model="description"
              outlined
              label="What are trying to do?"
              hint="Describe you project is as much detail as you can"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter project description',
              ]"
            />
          </div>
        </div>

        <div class="row justify-between q-py-md">
          <div class="col-5">
            <q-input
              v-model="startDate"
              type="date"
              stack-label
              label="Start Date"
            />
          </div>
          <div class="col-5">
            <q-input
              class=""
              v-model="deadline"
              type="date"
              stack-label
              label="Deadline"
            />
          </div>
        </div>
        <div class="row q-py-md">
          <div class="col-5">
            <q-select
              class=""
              v-model="topic"
              single
              :options="topics"
              label="Topic"
              use-chips
            />
          </div>
        </div>
        <div class="row q-py-md">
          <div class="col-8">
            <q-input
              class=""
              v-model="name"
              label="Project Name*"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter a project name',
              ]"
            />
          </div>
        </div>
        <div class="row q-py-xl">
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
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { topicService, projectService } from '../core/services';
import { Project } from '../core/models';

interface FormTopic {
  id: string;
  label: string;
}
const arrTopic: FormTopic[] = [];
const name = ref();
const description = ref();
const startDate = ref();
const deadline = ref();
const topic = ref();
const topics = ref(arrTopic);

const onSubmit = () => {
  const projectModel: Project = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    deadline: deadline.value,
    topic: topic.value,
  };
  projectService.newProject({ project: projectModel });
};

const onReset = () => {
  name.value = null;
  description.value = null;
  deadline.value = null;
  startDate.value = null;
  topic.value = null;
};

onMounted(() => {
  topicService.getTopics().then((res) => {
    const data = res.data.data;

    data.map((topic: any) => {
      const topx: FormTopic = { id: topic.id, label: topic.attributes.name };
      console.log('!!!topic', topx);

      topics.value.push(topx);
    });
  });
});
</script>
<style scoped lang="scss">
.project-form {
}
</style>

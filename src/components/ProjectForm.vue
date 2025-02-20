<template>
  <!-- <q-page class="window-height row justify-center"> -->
  <div class="col-8 q-my-lg" style="min-height: 100vh; text-align: center">
    <q-card>
      <q-card-section class="">
        <h4 class="text-h5 q-my-md">Create a Project</h4>
      </q-card-section>
      <div class="q-pa-md project-form">
        <q-form @submit="onSubmit" @reset="onReset" class="" name="project">
          <div class="row">
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
                    (val && val.length > 0) ||
                    'Please enter project description',
                ]"
              />
            </div>
          </div>

          <div class="row justify-between q-py-md">
            <div class="col-5">
              <q-input
                v-model="startDate"
                type="date"
                outlined
                stack-label
                label="Start Date"
              />
            </div>
            <div class="col-5">
              <q-input
                class=""
                v-model="deadline"
                outlined
                type="date"
                stack-label
                label="Deadline"
              />
            </div>
          </div>
          <div class="row q-py-md">
            <div class="col">
              <q-select
                v-model="topic"
                single
                outlined
                :options="topics"
                label="Topic"
                use-chips
              />
            </div>
          </div>
          <div class="row q-py-md">
            <div class="col">
              <q-input
                v-model="name"
                outlined
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
  </div>
  <!-- </q-page> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { topicService, projectService } from '../core/services';
import { ProjectModel } from '../core/models';
import { useRouter } from 'vue-router';
const router = useRouter();
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
  const projectModel: ProjectModel = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    // deadline: deadline.value,
    topicName: topic.value,
    id: '',
    topicImage: '',
    ownerAvatarUrl: '',
    ownerProfileImageUrl: '',
  };
  projectService.create(projectModel).then((res) => {
    const project = res.data;
    router.replace(`/project/${project['id']}`);
  });
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

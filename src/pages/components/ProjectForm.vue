<template>
  <CustFormCard icon="engineering" @submit="onSubmit" @reset="onReset">
    <!--content for header slot-->
    <template #header> New Project </template>

    <!--Default slot content here-->
    <CustQInput
      v-model="description"
      type="textarea"
      label="What are trying to do?"
      hint="Describe you project is as much detail as you can"
      :rules="[
        (val) => (val && val.length > 0) || 'Please enter project description',
      ]"
    />

    <div class="row justify-between q-py-md">
      <div class="col-5">
        <CustQInput
          v-model="startDate"
          label="Start Date"
          type="date"
          :rules="[(val) => (val && val.length > 0) || 'Start Date required']"
        />
      </div>
      <div class="col-5">
        <CustQInput
          v-model="deadline"
          label="Deadline"
          type="date"
          :rules="[
            (val) => (val && val.length > 0) || 'Deadline date required',
          ]"
        />
      </div>
    </div>

    <q-select
      v-model="topic"
      dense
      single
      outlined
      :options="topics"
      label="Topic"
      use-chips
    />

    <CustQInput
      v-model="name"
      label="Project name"
      :rules="[(val) => (val && val.length > 0) || 'Project name required']"
    />
  </CustFormCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { topicService, projectService } from '../../core/services';
import { ProjectModel } from '../../core/models';
import { useRouter } from 'vue-router';
import CustQInput from './custom/CustQInput.vue';
import CustFormCard from './CustFormCard.vue';

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

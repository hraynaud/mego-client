<template>
  <CustFormCard icon="engineering" @submit="onSubmit" @reset="onReset">
    <!--content for header slot-->
    <template #header> New Project </template>

    <!--Default slot content here-->
    <CustQInput v-model="description" type="textarea" label="What are trying to do?"
      hint="Describe you project is as much detail as you can" rows="15" :rules="[
        (val) => (val && val.length > 0) || 'Please enter project description',
      ]" :customClass="'q-pb-xl'" />


    <q-select v-model="topic" dense single outlined :options="topics" label="Topic" use-chips />

    <CustQInput v-model="name" label="Project name"
      :rules="[(val) => (val && val.length > 0) || 'Project name required']" />

    <q-btn flat color="primary" label="Add Task" no-caps @click="showNewTaskForm" />
    <q-dialog v-model="newTaskVisible" @before-show="clearNewTask">
      <ProjectTaskForm v-model="newTask" @submit="handleTaskSubmit" />
    </q-dialog>

    <q-expansion-item label="Task and Timeline" icon="calendar_month">


    </q-expansion-item>

    <q-separator />

  </CustFormCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { topicService, projectService } from '../../core/services';
import { ProjectModel } from '../../core/models';
import { useRouter } from 'vue-router';
import CustQInput from './custom/CustQInput.vue';
import CustFormCard from './CustFormCard.vue';
import ProjectTaskForm, { Task } from './ProjectTaskForm.vue';

interface FormTopic {
  id: string;
  label: string;
}

const arrTopic: FormTopic[] = [];
const router = useRouter();
const name = ref();
const description = ref('');
const startDate = ref();
const deadline = ref();
const topic = ref();
const topics = ref(arrTopic);
const newTaskVisible = ref(false);
const newTask = ref<Task>({ name: 'do something', status: 'not-started', notes: '' })

const onSubmit = async () => {
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
    progress: ['this', 'that'],
    openItems: [],
    roadBlocks: [],
    tasks: []
  };


  const project = await projectService.create(projectModel)
  router.replace(`/project/${project['id']}`);
};

const onReset = () => {
  name.value = null;
  description.value = '';
  deadline.value = null;
  startDate.value = null;
  topic.value = '';
};



function showNewTaskForm() {
  clearNewTask();
  newTaskVisible.value = true;
}

const clearNewTask = () => {
  newTask.value = { name: '', status: 'todo', notes: '' };
};

const hideNewTask = () => (newTaskVisible.value = false);

const handleTaskSubmit = () => {
  // const addMeTopic = {
  //   value: '',
  //   label: `${newTaks.value.name}`,
  // };

  window.alert(JSON.stringify(newTask.value))
  hideNewTask();
};

onMounted(async () => {
  const data = await topicService.list();

  data.map((topic: any) => {
    const topx: FormTopic = { id: topic.id, label: topic.attributes.name };
    topics.value.push(topx);
  });
});

</script>

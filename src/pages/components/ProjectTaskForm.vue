<template>
  <PopupForm :data="headerData">


    <CustQInput v-model="task.name" label="Task" :rules="[(val) => (val && val.length > 0) || 'Task name required']" />

    <CustQInput v-model="task.notes" label="Notes (optional)" type="textarea" />
    Status:
    <q-radio size="xs" v-model="task.status" val="completed" label="Completed" />
    <q-radio size="xs" v-model="task.status" val="in-progress" label="In Progress" />
    <q-radio size="xs" v-model="task.status" val="not-started" label="Not Started" />
    <q-radio size="xs" v-model="task.status" val="blocked" label="Blocked" />

    <div class="row justify-between ">
      <div class="col-5">
        <CustQInput v-model="task.startDate" label="Start Date" type="date" />
      </div>
      <div class="col-5">
        <CustQInput v-model="task.deadline" label="Deadline" type="date" />
      </div>
    </div>
  </PopupForm>
</template>

<script setup lang="ts">
import PopupForm, { HeaderData } from 'src/pages/components/PopupForm.vue';
import CustQInput from 'src/pages/components/custom/CustQInput.vue';

export interface Task {
  name: string;
  status: string;
  notes?: string;
  startDate?: string;
  deadline?: string;
}

const task = defineModel<Task>({
  default: () => ({ name: '', status: 'not-started' }),
});

const headerData: HeaderData = {
  icon: 'contact_page',
  header: 'Add Task',
};
</script>

<template>
  <q-page>
    <page-header>Dashboard</page-header>

    <!-- <div class="flex flex-center column">
      <div class="row" style="min-height: 400px; width: 100%; padding: 16px">
        <div
          id="parent"
          class="fit row wrap justify-around"
          style="overflow: hidden"
        >
          <div class="col-3 bg-grey-6" style="overflow: auto">
            <div class="q-pa-md">
              <person-card :p="me" />
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="flex flex-center column">
      <div
        class="row bg-blue-grey-2"
        style="min-height: 400px; width: 95%; padding: 24px"
      >
        <div
          id="parent"
          class="fit row wrap justify-around"
          style="overflow: hidden"
        >
          <div class="col-3 bg-grey-6" style="overflow: auto">
            <person-card :p="me" />
          </div>
          <div class="col-6 bg-grey-6" style="overflow: auto">
            <q-card class="no-border-radius">
              <q-card-section> Child #2 </q-card-section>
            </q-card>
          </div>
          <div class="col-2 bg-grey-6" style="overflow: auto">
            <q-card class="no-border-radius">
              <q-card-section> Child #3 </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import PageHeader from 'src/components/PageHeader.vue';
import PersonCard from 'src/components/PersonCard.vue';
// import ProjectList from '../components/ProjectList.vue';
// import { useProjectList } from 'src/composables/use-project-list';
import { peopleApi, peopleService, authService } from '../core/services';
import { PersonModel } from 'src/core/models';
import { ref, onBeforeMount, onMounted } from 'vue';

const me = ref({} as PersonModel);
//TODO const me = ref<PersonModel>() understand why this doesn't work.

const loadme = () => {
  const id = authService.currentUser()['uid'];

  peopleApi.findPerson(id).then(function (resp: { data: any }) {
    me.value = peopleService.buildPerson(resp.data.data);
    // debugger;
  });
};

onBeforeMount(() => {
  loadme();
});

// const { projects } = useProjectList();
</script>

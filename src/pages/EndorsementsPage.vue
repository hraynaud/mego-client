<template>
  <q-page>
    <page-header>Explore your network</page-header>
    <h5 class="text-center">How can I help you today?</h5>
    <div class="q-pa-xl">
      <q-input outlined v-model="query" placeholder="Ask Mego...">
        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer" @click="gotopage" />
        </template>
      </q-input>
    </div>

    <div class="q-pa-md">
      <EndorsementPathList :endorsements="endorsements" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="10" :boundary-numbers="false" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import {
//   useEndorsementsList,
// } from 'src/composables/use-endorsement-list';
import { ComputedRef, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import EndorsementPathList from './components/EndorsementPathList.vue';
import PageHeader from './components/PageHeader.vue';
import {
  SearchParams,
  useEndorsementStore,
} from '../stores/endorsements-store';
import { EndorsementPathModel } from 'src/core/models';
const $q = useQuasar();
const current = ref(1);
const query = ref();
const topicName = ref();
const seachParams = ref<SearchParams>({
  page: undefined,
  query: undefined,
  topicName: undefined,
});
const eStore = useEndorsementStore();
const endorsements: ComputedRef<EndorsementPathModel[]> = computed(
  () => eStore.endorsements
);

const unsubscribe = eStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    const startTime = Date.now();
    if (name == 'loadEndorsements') {
      $q.loading.show({
        delay: 0, // ms
      });
    }

    after((result) => {
      if (name == 'setEndorsements') {
        $q.loading.hide();
      }
    });

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);

const gotopage = () => {
  if (query.value !== undefined) {
    seachParams.value.page = current.value;
    seachParams.value.query = query.value;
    seachParams.value.topicName = topicName.value;
    eStore.loadEndorsements(seachParams.value, current.value);
  }
};
</script>

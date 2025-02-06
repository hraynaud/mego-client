<template>
  <q-page class="flex column">
    <!-- Chat Messages Container -->
    <div class="chat-container q-px-xl q-py-lg q-mx-xl">
      <div v-for="(msg, index) in messages" :key="index" class="chat-message">
        {{ msg }}
      </div>
    </div>

    <div class="q-pa-md q-mb-lg">
      <EndorsementPathList :endorsements="endorsements" />
    </div>
    <q-page-sticky position="top" expand>
      <div class="col q-px-xl q-py-lg q-mx-xl">
        <q-input
          rounded
          outlined
          borderless
          autogrow
          v-model="message"
          type="text"
          placeholder="ask me anything"
          dense
          @keyup.enter="sendMessage"
        >
          <template v-slot:before>
            <q-avatar size="32px">
              <img src="../assets/AI Avatar.svg" />
            </q-avatar>
          </template>
          <template v-slot:append>
            <q-icon
              name="arrow_circle_up"
              class="cursor-pointer"
              @click="sendMessage"
            />
          </template>
        </q-input>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<style scoped>
.chat-container {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  max-height: calc(100vh - 80px); /* Adjusts for the chat input box */
}

.chat-message {
  background: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-left: 20px;
  max-width: 90%;
}

.chat-input-box {
  width: 100%;
  background: white;
  border: 1px solid green;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>

<script setup lang="ts">
// import { useEndorsementsList } from 'src/composables/use-endorsement-list';

import { ComputedRef, computed, ref, Ref } from 'vue';
import { useQuasar } from 'quasar';
import EndorsementPathList from '../components/EndorsementPathList.vue';
import PageHeader from '../components/PageHeader.vue';
import {
  SearchParams,
  useEndorsementStore,
} from '../stores/endorsements-store';
import { EndorsementPathModel } from 'src/core/models';
const $q = useQuasar();
const current = ref(1);
const query = ref();
let message: Ref<string> = ref('');
const messages = ref<string[]>([]);
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
const sendMessage = () => {
  if (message.value.trim() !== '') {
    messages.value.push(message.value);
    query.value = message.value;
    message.value = ''; // Clear input after sending
    gotopage();
  }
};
</script>

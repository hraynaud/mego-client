<template>
  <q-card>
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">Create a New Endorsement</h4>
    </q-card-section>
    <div class="q-pa-md project-form">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-px-sm q-pt-md q-pb-lg"
        name="endorsement"
      >
        <h5 class="q-mb-sm">Who do you want to endorse?</h5>
        <div class="row q-py-md" v-if="!newContactVisible">
          <div class="col-7">
            <q-select
              class=""
              v-model="endorseeId"
              single
              :options="contacts"
              label="Current Contacts"
              use-input
            />
          </div>
          <div class="col-4 q-ml-md self-end">
            <q-btn
              dense
              round
              unelevated
              color="accent"
              icon="person_add"
              @click="showNewContactForm"
            />
          </div>
        </div>

        <div v-if="newContactVisible" class="q-mt-l q-mb-xl">
          <h6>Enter New Contact Info</h6>
          <div class="row justify-between">
            <div class="col-5">
              <q-input v-model="firstName" stack-label label="First Name" />
            </div>
            <div class="col-5">
              <q-input
                class=""
                v-model="lastName"
                stack-label
                label="Last Name"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-12">
              <q-input class="" v-model="email" stack-label label="Email" />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col">
              <a href="#" @click="hideNewContact">Cancel</a>
            </div>
          </div>
        </div>

        <h5 class="q-mb-sm">What for?</h5>
        <div class="row q-py-md" v-if="!newTopicVisible">
          <div class="col-7">
            <q-select
              class=""
              v-model="topicId"
              single
              :options="topics"
              label="Topic"
              use-input
            />
          </div>
          <div class="col-3 q-ml-md self-end">
            <q-btn
              dense
              round
              unelevated
              color="accent"
              icon="new_label"
              @click="showNewTopicForm"
            />
          </div>
        </div>

        <div v-if="newTopicVisible" class="q-my-xl">
          <h6 class="q-mb-sm q-mt-xl">Enter New Topic Info</h6>
          <div class="row justify-between">
            <div class="col-8">
              <q-input v-model="topicName" stack-label label="New Topic Name" />
            </div>
          </div>
          <div class="row q-mt-xl">
            <div class="col-12">
              <q-input
                type="textarea"
                v-model="topicDescription"
                outlined
                label="Describe the topic you'd like to add"
                hint="You can provided as much detail as you like"
                lazy-rules="ondemand"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Please enter an endorsement description',
                ]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col">
              <a href="#" @click="hideNewTopic">Cancel</a>
            </div>
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
import {
  topicService,
  contactService,
  endorsementService,
} from '../core/services';
import { EndorsementFormModel } from '../core/models';

interface FormSelectOption {
  id: string;
  label: string;
}

const topics = ref<FormSelectOption[]>([]);
const contacts = ref<FormSelectOption[]>([]);
const topicId = ref();
const endorseeId = ref();
const newTopicVisible = ref(false);
const newContactVisible = ref(false);
const firstName = ref();
const lastName = ref();
const email = ref();
const topicName = ref();
const topicDescription = ref();
const newEndorsement: EndorsementFormModel = {};

function onSubmit() {
  if (isValidEndorsement()) {
    setEndorsee();
    setTopic();
    const endorsement = endorsementService.newEndorsement(newEndorsement);
    console.log(JSON.stringify(endorsement));
  } else {
    console.error(JSON.stringify(newEndorsement));
    // handle error
  }
}

onMounted(() => {
  topicService.getTopics().then((res: any) => {
    const data = res.data.data;

    data.map((topic: any) => {
      const topx: FormSelectOption = {
        id: topic.id,
        label: topic.attributes.name,
      };

      topics.value.push(topx);
    });

    contactService.getContacts().then((res: any) => {
      const data = res.data.data;

      data.map((contact: any) => {
        contacts.value.push({
          id: contact.id,
          label: `${contact.attributes.firstName} ${contact.attributes.lastName}`,
        });
      });
    });
  });
});

function onReset() {
  endorseeId.value = null;
  topicId.value = null;
  clearNewTopic();
  clearNewContact();
}

function showNewContactForm() {
  endorseeId.value = null;
  newContactVisible.value = true;
}

function hideNewContact() {
  clearNewContact();
  newContactVisible.value = false;
}

function showNewTopicForm() {
  topicId.value = null;
  newTopicVisible.value = true;
}

function hideNewTopic() {
  clearNewTopic();
  newTopicVisible.value = false;
}

const isValidEndorsement = (): boolean => {
  return canSetEndorsee() && canSetTopic();
};

const setEndorsee = () => {
  if (endorseeId.value) {
    newEndorsement.endorseeId = endorseeId.value.id;
  } else {
    newEndorsement.newPerson = {
      first: firstName.value,
      last: lastName.value,
      email: email.value,
    };
  }
};

const setTopic = () => {
  if (topicId.value) {
    newEndorsement.topicId = topicId.value.id;
  } else {
    newEndorsement.newTopic = {
      name: topicName.value,
      description: topicDescription.value,
    };
  }
};

function clearNewContact() {
  firstName.value = null;
  lastName.value = null;
  email.value = null;
}
function clearNewTopic() {
  topicDescription.value = null;
  topicName.value = null;
}

const canSetEndorsee = (): boolean => {
  return isValidNewContact() || endorseeId.value;
};

const canSetTopic = (): boolean => {
  return isValidNewTopic() || topicId.value;
};
const isValidNewContact = (): boolean => {
  return firstName.value && lastName.value && email.value;
};
const isValidNewTopic = (): boolean => {
  return topicDescription.value && topicName.value;
};
</script>
<style scoped lang="scss">
.project-form {
  width: 500px;
}
</style>

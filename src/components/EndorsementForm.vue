<template>
  <div class="q-pa-xl row justify-center">
    <q-card class="col-5">
      <q-card-section>
        <h5 class="q-my-md text-center">Create an Endorsment</h5>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" name="endorsement">
          <q-select
            v-model="endorseeId"
            :options="contacts"
            class="q-py-sm"
            label="Current Contacts"
            outlined
            dense
            use-input
          >
            <template v-slot:after>
              <q-icon name="person_add" @click="showNewContactForm" />
            </template>
          </q-select>

          <q-select
            v-model="topicId"
            :options="topics"
            class="q-py-sm"
            label="Topic"
            outlined
            dense
            use-input
          >
            <template v-slot:after>
              <q-icon name="person_add" @click="showNewTopicForm"></q-icon>
            </template>
          </q-select>

          <CustQInput
            v-model="blurb"
            type="textarea"
            label="Description"
            hint="Say more about why you are making this endorsement"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter an description',
            ]"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Submit" type="submit" color="primary" flat no-caps />
        <q-btn label="Cancel" color="primary" flat class="q-ml-sm" no-caps />
      </q-card-actions>
    </q-card>
  </div>

  <q-dialog v-model="newContactVisible" @before-show="clearContact">
    <ContactForm v-model="newContact" @submit="handleContactSubmit" />
  </q-dialog>

  <q-dialog v-model="newTopicVisible">
    <TopicForm v-model="newTopic" @submit="handleTopicSubmit" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CustQInput from 'src/components/custom/CustQInput.vue';

import {
  topicService,
  contactService,
  endorsementService,
} from '../core/services';
import {
  EndorsementFormModel,
  PersonFormModel,
  TopicFormModel,
} from '../core/models';
import ContactForm from '../components/ContactForm.vue';
import TopicForm from '../components/TopicForm.vue';
interface FormSelectOption {
  id: string;
  label: string;
}

const newTopicVisible = ref(false);
const newContactVisible = ref(false);
const topics = ref<FormSelectOption[]>([]);
const contacts = ref<FormSelectOption[]>([]);
const topicId = ref();
const endorseeId = ref();
const blurb = ref();
const newEndorsement: EndorsementFormModel = {};

const newContact = ref<PersonFormModel | object>({});

const newTopic = ref<TopicFormModel>({
  name: '',
  description: '',
});

function onSubmit() {
  if (isValidEndorsement()) {
    setEndorsee();
    setTopic();
    endorsementService
      .newEndorsement(newEndorsement)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => alert(error))
      .finally(() => clearall());
  } else {
    alert('Invalid');
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
  clearall();
}

function clearall() {
  endorseeId.value = null;
  topicId.value = null;
  // clearNewTopic();
}

const isValidEndorsement = (): boolean => {
  return canSetEndorsee() && canSetTopic();
};

const setEndorsee = () => {
  if (endorseeId.value) {
    newEndorsement.endorseeId = endorseeId.value.id;
  } else {
    newEndorsement.newPerson = {
      first: newContact.value.firstName,
      last: newContact.value.lastName,
      email: newContact.value.email,
    };
  }
};

const setTopic = () => {
  if (topicId.value) {
    newEndorsement.topicId = topicId.value.id;
  } else {
    // newEndorsement.newTopic = {
    //   name: topicName.value,
    //   description: topicDescription.value,
    // };
  }
};

const canSetEndorsee = (): boolean => {
  return isValidNewContact() || endorseeId.value;
};

const canSetTopic = (): boolean => {
  return isValidNewTopic() || topicId.value;
};

const isValidNewContact = (): boolean => {
  // return Object.values(newContact.value).every((value) => value != null);
  return noNulls(newContact.value);
};

const isValidNewTopic = (): boolean => {
  return Object.values(newTopic.value).every((value) => value != null);
};

const noNulls = (data: object): boolean =>
  Object.values(data).every((value) => value != null);

function showNewContactForm() {
  endorseeId.value = null;
  newContactVisible.value = true;
}

function showNewTopicForm() {
  topicId.value = null;
  newTopicVisible.value = true;
}

const handleTopicSubmit = () => {
  clearNewTopic();
  newTopicVisible.value = false;
};
const handleContactSubmit = () => {
  clearContact();
  newContactVisible.value = false;
};

const clearNewTopic = () => {
  newTopic.value = { name: '', description: '' };
};

const clearContact = () => {
  newContact.value = {};
};
</script>

<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    name="endorsement"
    class="q-pa-xl row"
  >
    <q-card class="col-5 form-card offset-md-1">
      <div class="header text-center q-mb-sm">New Endorsement</div>
      <div class="text-center card-header">
        <thing-avatar :data="avatarData" cls="large project" />
      </div>

      <q-card-section>
        <q-select
          v-model="currEndorsee"
          :options="contacts"
          class="q-py-sm"
          label="Current Contacts"
          lazy-rules="ondemand"
          outlined
          dense
          use-input
        >
          <template v-slot:after>
            <q-icon
              name="person_add_alt_1"
              @click="showNewContactForm"
              size="20px"
            />
          </template>
        </q-select>

        <q-select
          v-model="selectedTopic"
          :options="topics"
          class="q-py-sm"
          label="Topic"
          outlined
          dense
          use-input
        >
          <template v-slot:after>
            <q-icon name="topic" @click="showNewTopicForm"></q-icon>
          </template>
        </q-select>

        <CustQInput
          v-model="blurb"
          type="textarea"
          label="Description"
          hint="Say more about why you are making this endorsement"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-py-sm">
        <q-btn label="Submit" type="submit" color="primary" flat no-caps />
        <q-btn label="Cancel" color="primary" flat class="q-ml-sm" no-caps />
      </q-card-actions>
    </q-card>
  </q-form>

  <q-dialog v-model="newContactVisible" @before-show="clearNewContact">
    <ContactForm v-model="newContact" @submit="handleContactSubmit" />
  </q-dialog>

  <q-dialog v-model="newTopicVisible" @before-show="clearNewTopic">
    <TopicForm v-model="newTopic" @submit="handleTopicSubmit" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContactForm from './ContactForm.vue';
import TopicForm from './TopicForm.vue';
import CustQInput from './custom/CustQInput.vue';
import ThingAvatar, {
  ThingAvatarData,
} from 'src/pages/components/ThingAvatar.vue';
import {
  topicService,
  contactService,
  endorsementService,
} from '../../core/services';

import {
  EndorsementFormModel,
  PersonFormModel,
  TopicFormModel,
} from '../../core/models';

interface FormSelectOption {
  value: string;
  label: string;
}

const newTopicVisible = ref(false);
const newContactVisible = ref(false);
const topics = ref<FormSelectOption[]>([]);
const contacts = ref<FormSelectOption[]>([]);
const selectedTopic = ref();
const currEndorsee = ref();
const blurb = ref();
const newEndorsement: EndorsementFormModel = { description: undefined };
const newContact = ref<PersonFormModel>({});
const newTopic = ref<TopicFormModel>({});

const avatarData: ThingAvatarData = {
  icon: 'thumb_up',
  imgUrl: undefined,
  role: undefined,
};
function onSubmit() {
  if (isValidEndorsement()) {
    setEndorsee();
    setTopic();
    newEndorsement.description = blurb.value;
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
        value: topic.id,
        label: topic.attributes.name,
      };

      topics.value.push(topx);
    });

    contactService.getContacts().then((res: any) => {
      const data = res.data.data;
      data.map((contact: any) => {
        contacts.value.push({
          value: contact.id,
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
  currEndorsee.value = null;
  selectedTopic.value = null;
  // clearNewTopic();
}

const isValidEndorsement = (): boolean => {
  return canSetEndorsee() && canSetTopic();
};

const setEndorsee = () => {
  debugger;
  if (currEndorsee.value && currEndorsee.value.value !== '') {
    newEndorsement.endorseeId = currEndorsee.value.value;
  } else {
    newEndorsement.newPerson = {
      first: newContact.value.firstName,
      last: newContact.value.lastName,
      email: newContact.value.email,
    };
  }
};

const setTopic = () => {
  debugger;
  if (selectedTopic.value && selectedTopic.value.value !== '') {
    newEndorsement.topicId = selectedTopic.value.value;
  } else {
    newEndorsement.newTopic = {
      name: newTopic.value.name,
      description: newTopic.value.description,
    };
  }
};

const canSetEndorsee = (): boolean => {
  return isValidNewContact() || currEndorsee.value;
};

const canSetTopic = (): boolean => {
  return isValidNewTopic() || selectedTopic.value;
};

const isValidNewContact = (): boolean => {
  return noNulls(newContact.value);
};

function showNewContactForm() {
  currEndorsee.value = null;
  clearNewContact();
  newContactVisible.value = true;
}

function showNewTopicForm() {
  selectedTopic.value = null;
  clearNewTopic();
  hideNewTopic();
  newTopicVisible.value = true;
}

const clearNewTopic = () => {
  newTopic.value = { name: '', description: '' };
};

const clearNewContact = () => {
  newContact.value = {
    firstName: '',
    lastName: '',
    email: '',
  };
};

const hideNewTopic = () => (newTopicVisible.value = false);

const hideNewContact = () => (newContactVisible.value = false);

const handleTopicSubmit = () => {
  const addMeTopic = {
    value: '',
    label: `${newTopic.value.name}`,
  };
  topics.value.push(addMeTopic);
  selectedTopic.value = addMeTopic;
  hideNewTopic();
};

const handleContactSubmit = () => {
  const addMeContact = {
    value: '',
    label: `${newContact.value.firstName} ${newContact.value.lastName}`,
  };
  contacts.value.push(addMeContact);
  currEndorsee.value = addMeContact;
  hideNewContact();
};

const isValidNewTopic = (): boolean => {
  return Object.values(newTopic.value).every((value) => value != null);
};

const noNulls = (data: object): boolean =>
  Object.values(data).every((value) => value != null);
</script>

<style lang="scss" scoped>
.form-card {
  border-radius: 8px;
}
.header {
  font-weight: 300;
  padding-top: 4%;
  height: 175px;
  font-size: 2.125em;
  color: white;
  background-color: $secondary;
}
</style>

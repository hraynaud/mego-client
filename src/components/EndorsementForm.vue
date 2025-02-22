<template>
  <div class="q-pa-xl row">
    <q-card class="col-5 form-card offset-md-1">
      <div class="header text-center q-mb-sm">New Endorsement</div>
      <div class="text-center card-header">
        <thing-avatar :data="avatarData" cls="large project" />
      </div>

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
              <q-icon
                name="person_add_alt_1"
                @click="showNewContactForm"
                size="20px"
              />
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
              <q-icon name="topic" @click="showNewTopicForm"></q-icon>
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

  <q-dialog v-model="newContactVisible" @before-show="clearNewContact">
    <ContactForm v-model="newContact" @submit="handleContactSubmit" />
  </q-dialog>

  <q-dialog v-model="newTopicVisible">
    <TopicForm v-model="newTopic" @submit="handleTopicSubmit" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContactForm from '../components/ContactForm.vue';
import TopicForm from '../components/TopicForm.vue';
import CustQInput from 'src/components/custom/CustQInput.vue';
import ThingAvatar, { ThingAvatarData } from 'src/components/ThingAvatar.vue';
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
const newContact = ref<PersonFormModel>({});
const newTopic = ref<TopicFormModel>({
  name: '',
  description: '',
});

const avatarData: ThingAvatarData = {
  icon: 'thumb_up',
  imgUrl: undefined,
  role: undefined,
};
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
    newEndorsement.newTopic = {
      name: newTopic.value.name,
      description: newTopic.value.description,
    };
  }
};

const canSetEndorsee = (): boolean => {
  return isValidNewContact() || endorseeId.value;
};

const canSetTopic = (): boolean => {
  return isValidNewTopic() || topicId.value;
};

const isValidNewContact = (): boolean => {
  return noNulls(newContact.value);
};

function showNewContactForm() {
  endorseeId.value = null;
  clearNewContact();
  newContactVisible.value = true;
}

function showNewTopicForm() {
  topicId.value = null;
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
  hideNewTopic();
};

const handleContactSubmit = () => {
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

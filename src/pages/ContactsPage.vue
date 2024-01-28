<template>
  <q-page>
    <div>
      <page-header>contacts</page-header>
    </div>
    <!-- <div class="q-pa-md">
      <h3>Search Friends</h3>
      <q-form @submit.prevent="onSubmit">
        <div class="row items-baseline justify-start q-gutter-lg">
          <label>Filter:</label>
          <div class="col-2 search-filter">
            <q-select
              v-model="friend"
              single
              :options="friends"
              :option-value="(opt) => opt?.id"
              :option-label="(opt) => opt?.attributes?.firstName"
              use-chips
              label="Friends"
            />
          </div>
          <div class="col-4 search-filter">
            <q-select
              v-model="topic"
              single
              :options="topics"
              :option-value="(opt) => opt?.id"
              :option-label="(opt) => opt?.attributes?.name"
              use-chips
              label="Topics"
            />
          </div>
          <q-btn round color="primary" icon="search" type="submit" />
        </div>
      </q-form>
    </div> -->

    <div class="">
      <ContactList :people="people"></ContactList>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PageHeader from 'components/PageHeader.vue';
import ContactList from '../components/ContactList.vue';

import { useContactList } from 'src/composables/use-contact-list';

const { people } = useContactList({ group: 'contacts' });
</script>
<style lang="scss" scoped>
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>
src/composables/use-contact-list

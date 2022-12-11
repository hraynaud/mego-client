<template>
  <q-page>
    <div class="q-pa-md">
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
    </div>
    <div class="q-pa-md">
      <h3>Friends</h3>
      <div class="q-gutter-md row items-start">
        <PeopleList :people="people"></PeopleList>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import PeopleList from '../components/PeopleList.vue';
import { usePeopleList } from 'src/composables/use-people-list';
import { computed } from 'vue';

const { getPeople } = usePeopleList(null);

const people = computed(() => {
  return getPeople();
});
</script>
<style lang="scss" scoped>
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>

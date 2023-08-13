<template>
  <div><H3>Recent Activity</H3></div>
  <div>
    <q-page>
      <div class="q-pa-md">
        <h5>New Projects</h5>
        <div class="q-gutter-md row items-start">
          <ProjectList :projects="projects"></ProjectList>
        </div>
      </div>
      <div class="q-pa-md">
        <h5>New Endorsements</h5>
        <EndorsementList :endorsements="endorsements" />
      </div>
      <q-page-sticky position="bottom-right" :offset="[64, 36]">
        <q-btn fab icon="add" color="accent" to="/endorsements/new" />
      </q-page-sticky>
    </q-page>

    <div class="q-pa-md q-gutter-md">
      <q-list bordered class="rounded-borders" style="max-width: 350px">
        <q-item-label header>Friends</q-item-label>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this weekend. Do you
              want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top> 1 min ago </q-item-section>
        </q-item>

        <q-separator inset="item" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Linear Project</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">John</span>
              -- Can we schedule a call for tomorrow?
            </q-item-label>
          </q-item-section>

          <q-item-section side top> 1 min ago </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import EndorsementList from '../components/EndorsementList.vue';
import ProjectList from '../components/ProjectList.vue';
import { useEndorsementsList } from 'src/composables/use-endorsement-list';
import { useProjectList } from 'src/composables/use-project-list';

const { endorsements } = useEndorsementsList();
const { projects } = useProjectList();
</script>

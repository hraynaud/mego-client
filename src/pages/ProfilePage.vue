<template lang="">
  <q-page style="max-height: 90vh; overflow-y: scroll">
    <div class="row">
    <div class="offset-xs-1 col-sm-8 col-md-6">
   <h4>{{profile.firstName}}</h4>
    <ProfileCard :p="profile" />

    <q-card class="q-my-xs">
      <q-card-section>
        <p class="text-h6">Endorsers</p>
          <EndorsementList :endorsements="endorsers" :deleteable=false displayType="endorser"/>
      </q-card-section>
    </q-card>

    <q-card class="q-my-xs">
        <q-card-section>
          <p class="text-h6">Endorsees</p>
          <EndorsementList :endorsements="endorsees" :deleteable=true displayType="endorsee"/>
        </q-card-section>
    </q-card>
  </div>
</div>



    <!-- <q-page-sticky position="bottom-right" :offset="[64, 36]">
      <q-fab
        v-model="fabCenter"
        vertical-actions-align="center"
        color="primary"
        glossy
        icon="add"
        direction="up"
      >
        <q-fab-action color="primary" @click="onClick" icon="approval" label="Endorse Someone"  to="/endorsements/new"/>
        <q-fab-action color="secondary" @click="onClick" icon="build_circle" label="Create a Project" to="/projects/new" />
        <q-fab-action color="orange" @click="onClick" icon="person_add" label="Invite a Friend" to="/invites/new" />
      </q-fab>
    </q-page-sticky> -->
  </q-page>
</template>
<script setup lang="ts" allowJs: true>
import {EndorsementModel, PersonModel } from 'src/core/models';
import { authService, peopleApi, peopleService } from 'src/core/services';
import { onMounted, ref,computed} from 'vue';
import ProfileCard from '../components/ProfileCard.vue';
import EndorsementList from '../components/EndorsementList.vue';
import { useProfileStore } from 'src/stores/profile-store';
import { useEndorsementEvent } from 'src/composables/use-endorsement-event';
const profileStore = useProfileStore();

defineProps({
  p: PersonModel,
});


useEndorsementEvent();

const profile = ref({} as PersonModel);
const endorsees = computed(() => profileStore.endorsees)
const endorsers = computed(() => profileStore.endorsers)


onMounted(() => {
  peopleApi
    .findPerson(authService.currentUser()['uid'])
    .then(function (resp: {data: any}) {
      profile.value = peopleService.buildPerson(resp.data.data);
      profileStore.initEndorsements(profile.value.endorsers as [EndorsementModel], profile.value.endorsees as [EndorsementModel],)
    });

});


</script>
<style lang=""></style>

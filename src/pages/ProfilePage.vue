<template lang="">
  <q-page>
   <h4>{{profile.firstName}}</h4>
    <ProfileCard :p="profile" />

    <q-card class="q-my-sm">

      <q-card-section>
        <p class="text-h6">Endorsees</p>
          <EndorsementList :endorsements="profile.endorsees" :deleteable="false" displayType="endorsee"/>
      </q-card-section>
    </q-card>

    <q-card class="q-my-sm">

        <q-card-section>
          <p class="text-h6">Endorsers</p>
          <EndorsementList :endorsements="profile.endorsers" :deleteable="false" displayType="endorser"/>
        </q-card-section>
    </q-card>




    <q-page-sticky position="bottom-right" :offset="[64, 36]">
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
    </q-page-sticky>
  </q-page>
</template>
<script setup lang="ts" allowJs: true>
import {PersonModel } from 'src/core/models';
import { authService, peopleApi, peopleService } from 'src/core/services';
import { onMounted, ref } from 'vue';
import ProfileCard from '../components/ProfileCard.vue';
import EndorsementList from '../components/EndorsementList.vue';
const profile = ref({} as PersonModel);


fabCenter: ref(true),

onMounted(() => {
  peopleApi
    .findPerson(authService.currentUser()['uid'])
    .then(function (resp: {data: any}) {
      profile.value = peopleService.buildPerson(resp.data.data);
    });

});

</script>
<style lang=""></style>

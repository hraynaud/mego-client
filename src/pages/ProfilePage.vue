<template lang="">
  <div><H3>Profile</H3></div>
  <div>
    <ProfileCard :p="profile" />
  </div>
  <q-separator />
  <q-card>
  <div>

    <div class="col">Endorsers</div>
    <div class="q-pa-md">
      <EndorsementList :endorsements="profile.endorsers" :deleteable="false" displayType="endorser"/>
    </div>
  </div>
  <q-separator />
  <div>
    <div class="col">Endorsees</div>
    <div class="q-pa-md">
      <EndorsementList :endorsements="profile.endorsees" :deleteable="false" displayType="endorsee"/>
    </div>

  </div>
</q-card>
</template>
<script setup lang="ts" allowJs: true>
import {PersonModel } from 'src/core/models';
import { authService, peopleApi, peopleService } from 'src/core/services';
import { onMounted, ref } from 'vue';
import ProfileCard from '../components/ProfileCard.vue';
import EndorsementList from '../components/EndorsementList.vue';
const profile = ref({} as PersonModel);




onMounted(() => {
  peopleApi
    .findPerson(authService.currentUser()['uid'])
    .then(function (resp: {data: any}) {
      profile.value = peopleService.buildPerson(resp.data.data);
    });

});

</script>
<style lang=""></style>

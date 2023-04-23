<template lang="">
  <div>
    <ProfileCard :p="profile" />
  </div>
  <q-separator />
  <div>
    <div class="col">Incoming</div>
    <div class="q-pa-md">
      <EndorsementList :endorsements="incomingEndorsements" :deleteable="false" />
    </div>
  </div>
  <q-separator />
  <div>
    <div class="col">Outgoing</div>
    <div class="q-pa-md">
      <EndorsementList :endorsements="outgoingEndorsements" :deleteable="false" />
    </div>
  </div>
</template>
<script setup lang="ts" allowJs: true>
import { EndorsementModel, PersonModel } from 'src/core/models';
import { authService, peopleApi, peopleService } from 'src/core/services';
import { onMounted, ref } from 'vue';
import ProfileCard from '../components/ProfileCard.vue';
import EndorsementList from '../components/EndorsementList.vue';
const profile = ref({} as PersonModel);
const incomingEndorsements = ref([] as EndorsementModel[])
const outgoingEndorsements = ref([] as EndorsementModel[])

const groupEndorsementByDirection = (data: [])=>{
 return data.forEach((d: any) => {

    if (d.attributes.direction =='incoming'){
      incomingEndorsements.value.push(d)
    }else{
      outgoingEndorsements.value.push(d)
    }
  })
}

onMounted(() => {
  peopleApi
    .findPerson(authService.currentUser()['uid'])
    .then(function (resp: {data: any}) {
      profile.value = peopleService.buildPerson(resp.data.data);
      groupEndorsementByDirection(resp.data.included);
    });

});

</script>
<style lang=""></style>

<template>
  <q-layout view="hHh Lpr lff" container="true">
    <q-header elevated class="bg-gray">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title v-if="$q.screen.gt.sm">Konmego</q-toolbar-title>

        <NavItem icon="logout" route="/login" clickable v-ripple @click.prevent="logout">Logout
        </NavItem>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
      :breakpoint="500" bordered class="">
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- <NavItem icon="groups" route="/contacts"> Friends </NavItem> -->
          <!-- <q-item-label header>Personal</q-item-label> -->

          <NavExpansionItem :imgSrc="currUserAvatar" :label="name" class="q-mt-xl">
            <NavItem icon="account_circle" route="/person/me">
              My Profile
            </NavItem>
            <NavItem icon="rocket" route="/projects/new">
              Launch Project
            </NavItem>
            <NavItem icon="thumb_up" route="/endorsements/new">
              Endorse Someone
            </NavItem>
          </NavExpansionItem>
          <q-separator spaced />
          <q-item-label header>Community</q-item-label>
          <NavItem icon="forum" route="/"> Activity </NavItem>
          <NavItem icon="engineering" route="/projects">Projects </NavItem>

          <NavItem route="/endorsements" icon="hub">Talent Pool</NavItem>
          <q-separator spaced />
          <q-item-label header>Ask Mego AI</q-item-label>
          <NavItem icon="assistant" route="/chat"> Chat </NavItem>
        </q-list>
      </q-scroll-area>

      <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn dense round unelevated color="accent" icon="chevron_left" @click="miniState = true" />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { authService, peopleApi, peopleService } from 'src/core/services';
import { useRouter } from 'vue-router';
import NavItem from 'src/pages/components/NavItem.vue';
import NavExpansionItem from 'src/pages/components/NavExpansionItem.vue';
import { PersonModel } from 'src/core/models';
const miniState = ref(false);
const router = useRouter();
const user = authService.currentUser();
const name = user.name;
const currUserAvatar = user.avatar;
const drawer = ref(false);
const me = ref({} as PersonModel);
function drawerClick(e: { stopPropagation: () => void }) {
  if (miniState.value) {
    miniState.value = false;

    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation();
  }
}
function logout() {
  authService.logout();
  router.replace('/auth/login');
}

const loadme = () => {
  const id = authService.currentUser()['uid'];

  peopleApi.findPerson(id).then(function (resp: { data: { data: unknown } }) {
    me.value = peopleService.buildPerson(resp.data.data);
  });
};

onBeforeMount(() => {
  loadme();
});
</script>

<style lang="scss">
.GPL {
  &__toolbar {
    height: 64px;
  }

  &__toolbar-input {
    width: 70%;
  }
}

.q-item__section--avatar {
  color: inherit;
  min-width: 0px;
}

.q-item__section--side>.q-icon {
  font-size: 20px;
}

.q-item__section--side {
  padding-right: 14px;
}
</style>

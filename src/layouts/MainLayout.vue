<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Konmego</q-toolbar-title>

          <div class="q-pr-sm">{{ name }}</div>
          <q-avatar size="36px" class="q-mb-sm q-mr-md">
            <img :src="avatar" />
          </q-avatar>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="!drawer || miniState"
        @click.capture="drawerClick"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section> Home </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/me">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section> Me </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/projects">
              <q-item-section avatar>
                <q-icon name="construction" />
              </q-item-section>

              <q-item-section> Projects </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/endorsements">
              <q-item-section avatar>
                <q-icon name="approval" />
              </q-item-section>

              <q-item-section> Endorsements </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/people">
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>

              <q-item-section> People </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click.prevent="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
        <div
          class="q-mini-drawer-hide absolute"
          style="top: 15px; right: -17px"
        >
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>
      </q-drawer>

      <q-page-container>
        <q-page class="q-px-lg q-py-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue';
import { authService } from 'src/core/services';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const miniState = ref(false);
    const router = useRouter();
    const user = authService.currentUser();
    const name = user.name;
    const avatar = user.avatar;

    return {
      drawer: ref(false),
      miniState,
      name,
      avatar,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
      logout() {
        authService.logout();
        router.replace('/auth/login');
      },
    };
  },
};
</script>

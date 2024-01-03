<template>
  <q-layout view="hHh Lpr lff" container="true">
    <q-header elevated class="bg-gray">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title v-if="$q.screen.gt.sm" shrink="true">Konmego</q-toolbar-title>

        <q-input class="GPL__toolbar-input q-px-sm" dense standout="bg-primary" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <div class="q-pr-sm">{{ name }}</div>
        <q-avatar size="36px" class="q-mb-sm q-mr-md">
          <img :src="avatar" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
      :breakpoint="500" bordered class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>

          <q-expansion-item dense dense-toggle="" clickable v-ripple :content-inset-level="0.25" to="/projects">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="construction" />
              </q-item-section>
              <q-item-section> Projects </q-item-section>
            </template>
            <q-item clickable v-ripple to="/projects/new">
              <q-item-section avatar>
                <q-icon name="add_circle" />
              </q-item-section>

              <q-item-section>New</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-item clickable v-ripple to="/person/me">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section> Me </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/people">
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section> People </q-item-section>
          </q-item>

          <q-expansion-item dense dense-toggle="" clickable v-ripple :content-inset-level="0.25" to="/endorsements">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="approval" />
              </q-item-section>

              <q-item-section> Endorsements </q-item-section>
            </template>
            <q-item clickable v-ripple to="/endorsements/new">
              <q-item-section avatar>
                <q-icon name="add_circle" />
              </q-item-section>

              <q-item-section> Create New</q-item-section>
            </q-item>
          </q-expansion-item>

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
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn dense round unelevated color="accent" icon="chevron_left" @click="miniState = true" />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
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
    const search = ref();

    return {
      drawer: ref(false),
      miniState,
      name,
      avatar,
      search,

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
<style lang="scss">
.GPL {
  &__toolbar {
    height: 64px;
  }

  &__toolbar-input {
    width: 70%;
  }
}
</style>

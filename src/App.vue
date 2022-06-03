<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import MainLayout from './layouts/MainLayout.vue';
import LoginPage from './pages/LoginPage.vue';

export default defineComponent({
  name: 'App',
});
</script>

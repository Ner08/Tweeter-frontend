<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useStore } from 'vuex'
import { RouterView } from 'vue-router'
import SideBar from './components/sidebar-components/SideBar.vue'
import RegisterView from './views/RegisterView.vue';

const store = useStore()

const loggedIn: ComputedRef<boolean> = computed(() => store.state.auth.status.loggedIn);

</script>

<template>
  <SideBar v-if="loggedIn">
    <router-view :key="$route.fullPath" class="flex-shrink-1"></router-view>
  </SideBar>

  <RegisterView v-if="!loggedIn" />
</template>


<style scoped></style>

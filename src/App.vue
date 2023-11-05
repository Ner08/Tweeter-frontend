<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex'
import { RouterView } from 'vue-router'
import SideBar from './components/sidebar-components/SideBar.vue'
import RegisterView from './views/RegisterView.vue';

const store = useStore()

const loggedIn = computed(() => store.state.auth.status.loggedIn)
console.log("logged in ", loggedIn.value) 

</script>

<template>
  <SideBar v-if="loggedIn">
    <router-view class="flex-shrink-1"></router-view>
  </SideBar>
  
  <RegisterView v-if="!loggedIn"/>
</template>


<style scoped></style>

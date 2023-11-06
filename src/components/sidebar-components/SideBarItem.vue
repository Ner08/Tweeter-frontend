<script setup lang="ts">
import SideBarIcon from './icons/SideBarIcon.vue';
import { RouterLink } from 'vue-router';

defineProps({
  iconName: String
});
</script>

<template>
  <li class="nav-item mb-1">
    <router-link to="/" class="align-center text-decoration-none rounded-circle">
      <SideBarIcon :icon="iconName" />
    </router-link>
  </li>
</template>

<style scoped>
.router-link-active i {
  border-radius: 50%; 
  padding: 12px; 
  transition: background-color 0.3s; 
}

.router-link-active i:hover {
  background-color: #1f1f1f; 
}
</style>

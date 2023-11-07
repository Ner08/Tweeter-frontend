<script setup lang="ts">
import SideBarIcon from './icons/SideBarIcon.vue';
import { RouterLink } from 'vue-router';

defineProps({
  iconName: String
});
</script>

<template>
  <li class="nav-item">
    <router-link to="/" class="customRouter align-center text-decoration-none rounded-circle">
      <SideBarIcon :icon="iconName" />
    </router-link>
  </li>
</template>

<style scoped>
.customRouter i {
  border-radius: 50%; 
  padding: 12px; 
  transition: background-color 0.3s; 
}

.customRouter i:hover {
  background-color: #1f1f1f; 
}
</style>

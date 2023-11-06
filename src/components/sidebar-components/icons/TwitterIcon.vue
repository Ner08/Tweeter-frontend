<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <router-link to="/" class="align-items-center text-decoration-none rounded-circle">
    <i class="h3 bi bi-twitter text-light"></i>
  </router-link>
</template>

<style scoped>
.router-link-active i {
  border-radius: 50%; 
  padding: 12px; 
  transition: background-color 0.3s;
}

.router-link-active i:hover {
  background-color: #1b1b1b; 
}
i {
  display: flex;
  align-items: center; 
  justify-content: center;
  width: 100%; 
  height: 100%;
}
</style>
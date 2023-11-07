<script setup lang="ts">

defineProps({
  icon: String
});
</script>

<template>
  <i :class="icon + ' h3 bi text-light'"></i>
</template>

<style scoped>
i {
  display: flex;
  align-items: center; 
  justify-content: center; 
  width: 100%; 
  height: 100%; 
}
</style>

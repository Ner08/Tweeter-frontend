<script setup lang="ts">
import NavTabs from '@/components/home-components/NavTabs.vue';
import TweetForm from '@/components/home-components/TweetForm.vue';
import TweetItems from '@/components/home-components/TweetItems.vue';

</script>

<template>
  <div class="col col-md-6 col-sm-12 col-12 bg-black px-0 custom-border column">
    <NavTabs />
    <TweetForm/>
    <TweetItems/>
  </div>
</template>

<style scoped>

</style>
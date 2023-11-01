<script setup lang="ts">
import NavTabs from '@/components/home-components/NavTabs.vue';
import TweetForm from '@/components/home-components/TweetForm.vue';
import TweetItem from '@/components/home-components/TweetItem.vue';

</script>

<template>
  <div class="col col-md-6 col-sm-12 col-12 bg-black h-25 px-0 custom-border ">
    <NavTabs />
    <TweetForm/>
    <TweetItem/>
  </div>
</template>

<style scoped>

</style>
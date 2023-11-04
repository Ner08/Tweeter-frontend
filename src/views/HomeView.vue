<script setup lang="ts">
import NavTabs from '@/components/home-components/nav-tab/NavTabs.vue';
import TweetForm from '@/components/home-components/form-create/TweetForm.vue';
import TweetItems from '@/components/home-components/tweet-item/TweetItems.vue';

</script>

<template>
  <div class="col-10 col-md-8 col-lg-7 col-xl-5 col-xxl-4 bg-black px-0 custom-border column">
    <!-- For you/Following  -->
    <NavTabs />

    <!-- Form Create Tweet -->
    <TweetForm/>

    <!-- Shows all Tweets -->
    <TweetItems/>
  </div>
</template>

<style scoped>

</style>
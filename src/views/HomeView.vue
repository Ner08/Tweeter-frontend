<script setup lang="ts">
import NavTabs from '@/components/home-components/nav-tab/NavTabs.vue';
import TweetForm from '@/components/home-components/form-tweet/TweetForm.vue'
import TweetItems from '@/components/home-components/tweet-item/TweetItems.vue';
import { onMounted, ref } from 'vue';
import { AxiosError } from 'axios';
import { useStore } from 'vuex';

const store = useStore();
const errorTweet = ref<AxiosError|null>(null)

const getTweetsData = () => {
    store.dispatch("auth/getTweets").then(
        () => {
          //When tweets fetched do
        },
        (error) => {
            error.value =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log("Error: ", error.value)
        });
}
onMounted(() => {
    getTweetsData()
})

</script>

<template>
  <div class="col-10 col-md-8 col-lg-7 col-xl-5 col-xxl-4 bg-black px-0 custom-border column">
    
    <!-- For you/Following  -->
    <NavTabs />

    <!-- Form Create Tweet -->
    <TweetForm/>

    <!-- Shows all Tweets -->
    <TweetItems v-if="errorTweet" :err="errorTweet"/>
    <TweetItems v-else />
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import TweetItem from './TweetItem.vue';
import { onMounted, computed, type ComputedRef } from 'vue';
import { useStore } from 'vuex';

export interface Tweet {
    id: number
    userName: string
    name: string
    created_at: Date
    updated_at: Date
    createdAgo: string
    message?: string
    file?: string
    user_id: number
    shareUrl?: string
    like: number
    shares: number
    views: number
    numOfComments: number
}

const store = useStore()

const tweets: ComputedRef<Array<Tweet>> = computed(() => store.state.auth.tweets)

const getData = () => {
    store.dispatch("auth/getTweets").then(
        () => {
            /* modalLogin.dispose(); */
        },
        (error) => {
            const errorMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(errorMessage)
        });
}
onMounted(() => {
    getData()
})

</script>

<template>
    <TweetItem :key="tweet.id" v-for="tweet in tweets" :tweet="tweet" />
</template>

<style scoped></style>
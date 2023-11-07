<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TweetShow from '@/components/home-components/tweet-open/TweetShow.vue'
import ErrorComponent from '@/components/other/ErrorComponent.vue';
import type { AxiosError } from 'axios';

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
    parent_tweet_id?: number
    shareUrl?: string
    like: number
    shares: number
    views: number
    numOfComments: number
}

const store = useStore();
const route = useRoute();
const props = defineProps({
    id: { type: String, required: true }
})
const tweet = ref<Tweet | null>(null)
const errMessage: string = "Tweet not found." 
const errorGetTweet = ref<AxiosError | null>(null)

const id = ref<number>(Number(props.id))
console.log("Route params", route.params)
console.log("Tweet ID : ", id.value)

onMounted(() => {
    store.dispatch('auth/getTweet', props.id).then(
        fetchedTweet => {
            tweet.value = fetchedTweet;
            console.log("tweet: ", tweet.value)
        },
        error => {
            errorGetTweet.value = error
            console.log("errorGetTweet: ", errorGetTweet.value)
        }
    )
})
</script>

<template>
    <div class="col-10 col-md-8 col-lg-7 col-xl-5 col-xxl-4 bg-black px-0 custom-border column">
        <div v-if="tweet">
            <TweetShow :tweet="tweet" />
        </div>
        <ErrorComponent v-else-if="errorGetTweet" :message="errMessage" :error="errorGetTweet"/>

    </div>
</template>

<style scoped></style>
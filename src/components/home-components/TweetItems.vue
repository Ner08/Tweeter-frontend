<script setup lang="ts">
import TweetItem from './TweetItem.vue';
import {getAPI} from '../../helpers/apiGet'
import { ref } from 'vue';

const tweets = ref<[any]>();

const getData = () => getAPI("tweets").then(
    (res) => {
        if (res.status === 200) {
            tweets.value = res.data;
            console.log("all tweets:", tweets.value)
        }
        else (console.log(res))
    }
)

getData()


</script>

<template>
        <TweetItem :key="tweet.id" v-for="tweet in tweets" :tweet="tweet"/>
</template>

<style scoped></style>
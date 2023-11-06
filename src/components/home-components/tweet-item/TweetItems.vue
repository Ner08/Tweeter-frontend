<script setup lang="ts">
import TweetItem from './TweetItem.vue';
import { getAPI } from '../../../helpers/apiGet'
import { ref, onMounted } from 'vue';

/* type Tweet ={
    id:number,
    message:string,
    name:string,
    userName:string,
    file?:string,
    user_id:number,
    share_url:string,
    like:number,
    numOfComments:string,
    shares: number,
	views: number,
	createdAgo: string,
	created_at: Date,
	updated_at: Date
} */

const tweets = ref<any>();

const getData = () => getAPI("tweets").then(
    (res) => {
        if (res.status === 200) {
            tweets.value = res.data.data;
            console.log("all tweets:", tweets.value)
        }
        else (console.log(res))
    }
)

onMounted(() => {
    getData()
})



</script>

<template>
    <TweetItem :key="tweet.id" v-for="tweet in tweets" :tweet="tweet" />
</template>

<style scoped></style>
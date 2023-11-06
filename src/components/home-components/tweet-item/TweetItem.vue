<script setup lang="ts">
import { type PropType } from 'vue'
import ProfileIcon from '@/components/other/ProfileIcon.vue';
import TweetItemIcon from './TweetItemIcon.vue';

const iconComment: string = "bi bi-chat";
const iconRetweet: string = "bi bi-arrow-repeat";
const iconFavorite: string = "bi bi-heart";
const iconViews: string = "bi bi-bar-chart-line";
const iconBookmark: string = "bi bi-bookmark";
const iconDownload: string = "bi bi-upload"

const img: string = '';

export interface Tweet {
    id: number
    userName: string
    name: string
    created_at: Date
    updated_at: Date
    createdAgo: string
    message: string
    file?: string
    user_id: number
    shareUrl?: string
    like: number
    shares: number
    views: number
    numOfComments: number
}

const props = defineProps({
    tweet: {
        type: Object as PropType<Tweet>,
        required: true
    }
})


</script>

<!-- Tweet item -->

<template>
    <div class="card rounded-0 bg-black text-white border-dark">
        <div class="d-flex">
            <ProfileIcon />
            <div class="card-body">
                <span class="card-text">{{ props.tweet.name }}</span>
                <span class="card-text mx-1 dark">@{{ props.tweet.userName }}</span>
                <i class="dark">‧</i>
                <span class="card-text mx-2 dark"><small>{{ props.tweet.createdAgo }}</small></span>
                <p class="card-text mb-2">{{ props.tweet.message }}</p>
                <img v-if="img !== ''" src="../../assets/images/image.jpeg" class="card-img-bottom rounded-4" alt="...">

                <!-- Icons/Buttons -->
                <div class="d-flex justify-content-between pt-1">
                    <TweetItemIcon :icon="iconComment" :num="props.tweet.numOfComments" />
                    <TweetItemIcon :icon="iconRetweet" :num="props.tweet.shares" class="h5" />
                    <TweetItemIcon :icon="iconFavorite" :num="props.tweet.like" />
                    <TweetItemIcon :icon="iconViews" :num="props.tweet.views" />
                    <span class="d-flex justify-content-end">
                        <TweetItemIcon :icon="iconBookmark" class="mx-2" />
                        <TweetItemIcon :icon="iconDownload" class="mx-2 d-none d-sm-inline" />
                    </span>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dark {
    color: gray;
}
</style>
<script setup lang="ts">
import { type PropType } from 'vue'
import ProfileIcon from '../other/ProfileIcon.vue';
import TweeterItemIcon from './TweeterItemIcon.vue';

const iconComment: string = "bi bi-chat";
const iconRetweet: string = "bi bi-arrow-repeat";
const iconFavorite: string = "bi bi-heart";
const iconViews: string = "bi bi-bar-chart-line";
const iconBookmark: string = "bi bi-bookmark";
const iconDowload: string = "bi bi-upload"

const img: string = '';

export interface Tweet {
    id: number
    timestamp: Date
    message: string
    img?: string
    user_id: number
    shareUrl?: string
    like: number
    numOfComments: number
}

const props = defineProps({
    tweet: {
        type: Object as PropType<Tweet>,
        required: true

    }
})


</script>

<template>
    <div class="card rounded-0 bg-black text-white border-dark">
        <div class="d-flex">
            <ProfileIcon />
            <div class="card-body">
                <span class="card-text">{{ props.tweet.user_id }}</span>
                <span class="card-text mx-1 dark">@Nero</span>
                <i class="dark">‧</i>
                <span class="card-text mx-2 dark"><small>3 mins</small></span>
                <p class="card-text mb-2">{{ props.tweet.message }}</p>
                <img v-if="img !== ''" src="../../assets/images/image.jpeg" class="card-img-bottom rounded-4" alt="...">
                <div class="d-flex justify-content-between pt-1">
                    <TweeterItemIcon :icon="iconComment" :num="props.tweet.numOfComments" />
                    <TweeterItemIcon :icon="iconRetweet" :num="5" class="h5" />
                    <TweeterItemIcon :icon="iconFavorite" :num="23" />
                    <TweeterItemIcon :icon="iconViews" :num="150" />
                    <span class="d-flex justify-content-end">
                        <TweeterItemIcon :icon="iconBookmark" class="mx-2" />
                        <TweeterItemIcon :icon="iconDowload" class="mx-2 d-none d-sm-inline" />
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
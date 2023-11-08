<script setup lang="ts">
import { type PropType } from 'vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import TweetItemIcon from './TweetItemIcon.vue';
import type { Tweet } from '@/composables/custom-types';

const iconComment: string = "bi bi-chat";
const iconRetweet: string = "bi bi-arrow-repeat";
const iconFavorite: string = "bi bi-heart";
const iconViews: string = "bi bi-bar-chart-line";
const iconBookmark: string = "bi bi-bookmark";
const iconDownload: string = "bi bi-upload"

const props = defineProps({
    tweet: {
        type: Object as PropType<Tweet>,
        required: true
    }
})
</script>

<!-- Tweet item -->

<template>
    <router-link class="card rounded-0 bg-black text-white border-dark text-decoration-none "
        :to="`/tweet/${props.tweet.id}`">
        <div class="d-flex">
            <ProfileIcon />
            <div class="card-body">
                <span class="card-text">{{ props.tweet.name }}</span>
                <span class="card-text mx-1 dark">@{{ props.tweet.userName }}</span>
                <span class="dark mx-1">&#183;</span>
                <span class="card-text mx-2 dark"><small>{{ props.tweet.createdAgo }}</small></span>
                <p class="card-text mb-1 text-break">{{ props.tweet.message }}</p>
                <img v-if="props.tweet.file" :src="`http://127.0.0.1:8000/storage/${props.tweet.file}`"
                    class="card-img-bottom mt-2  rounded-3" alt="...">

                <!-- Icons/Buttons -->

                <div class="d-flex justify-content-between py-1">
                    <TweetItemIcon :icon="iconComment" :num="props.tweet.numOfComments" />
                    <TweetItemIcon :icon="iconRetweet" :num="props.tweet.shares" class="h5" />
                    <TweetItemIcon :icon="iconFavorite" :num="props.tweet.like" class="heartIcon"/>
                    <TweetItemIcon :icon="iconViews" :num="props.tweet.views" />
                    <span class="d-flex justify-content-end">
                        <TweetItemIcon :icon="iconBookmark" class="mx-2" />
                        <TweetItemIcon :icon="iconDownload" class="mx-2 d-none d-sm-inline" />
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.dark {
    color: gray;
}
.card-img-bottom {
    width: 90%;
}
.heartIcon{
    margin-top: 1px;
}
</style>
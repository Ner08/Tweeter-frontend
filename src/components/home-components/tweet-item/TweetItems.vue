<script setup lang="ts">
import TweetItem from './TweetItem.vue';
import { computed, type ComputedRef, type PropType } from 'vue';
import { useStore } from 'vuex';
import ErrorComponent from '@/components/other/ErrorComponent.vue';
import { AxiosError } from 'axios';
import type { Tweet } from '@/composables/custom-types';

const props = defineProps({
    comments: { type: Object as PropType<Array<Tweet>>, default: null },
    err: { type: AxiosError, default: null },
    areNotComments: { type: Boolean, default: true }
});

const store = useStore()
const tweets: ComputedRef<Array<Tweet>> = computed(() => store.state.auth.tweets)
const errMessage: string = "Tweet not found."

</script>

<template>
    <div v-if="comments">
        <TweetItem :key="comment.id" v-for="comment in comments" :tweet="comment" />
    </div>
    <div v-else-if="tweets">
        <TweetItem :key="tweet.id" v-for="tweet in tweets" :tweet="tweet" />
    </div>

    <div v-else-if="props.err">
        <ErrorComponent :message="errMessage" :error="err" />
    </div>
</template>

<style scoped></style>
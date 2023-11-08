<script setup lang="ts">
import { ref, type PropType, onMounted, computed, type ComputedRef } from 'vue';
import type { Tweet } from '@/composables/custom-types';
import ProfileIcon2 from '@/components/icons/ProfileIcon2.vue'
import TweetItemIcon from '../../home-components/tweet-item/TweetItemIcon.vue'
import HeadingTweet from '@/components/tweet-components/tweet-open/HeadingTweet.vue'
import TweetForm from '@/components/home-components/form-tweet/TweetForm.vue';
import TweetItems from '@/components/home-components/tweet-item/TweetItems.vue';
import LoaderComponent from '@/components/other/LoaderComponent.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { AxiosError } from 'axios';
import ErrorComponent from '@/components/other/ErrorComponent.vue';

const store = useStore();
const route = useRoute();
const props = defineProps({
    tweet: {
        type: Object as PropType<Tweet>,
        required: true
    }
})

//Icons
const iconComment: string = "bi bi-chat";
const iconRetweet: string = "bi bi-arrow-repeat";
const iconFavorite: string = "bi bi-heart";
const iconViews: string = "bi bi-bar-chart-line";
const iconBookmark: string = "bi bi-bookmark";
const iconDownload: string = "bi bi-upload"

//Number of Comment, Likes, Shares and Views
let numOfComments:number = props.tweet.numOfComments
let numOfLikes:number = props.tweet.like
let numOfShares:number = props.tweet.shares
let numOfViews:number = props.tweet.like

// Boolean if user is verified (Always true for now)
const verified: boolean = true;
const placeholderText: string = "Post your reply"

//Dates formated
const date = new Date(props.tweet.created_at);
const timeFormatted = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
const dateFormatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

//Important variables
const id = ref<number>(Number(route.params.id))
const comments = ref<Array<Tweet> | null>(null)
const errorComments = ref<AxiosError | null>(null)
const errorMessage: string = "No comments found."

const getComments = () => {
    store.dispatch('auth/getComments', id.value).then(
        (data) => {
            comments.value = data
        },
        err => {
            errorComments.value = err
        }
    )
}
const addComment = () => {
    numOfComments=numOfComments+1
}

onMounted(() => {
    getComments();
})

console.log("Route params", route.params)

</script>

<!-- Tweet item -->

<template>
    <!-- The heading with Post title and back button -->
    <HeadingTweet />

    <div class="bg-black text-white border-dark">
        <div class="card rounded-0 bg-black text-white">
            <div v-if="tweet" class="d-flex">
                <div class="card-body pt-0 pb-0 cardCustom">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-start align-items-center customDiv">
                            <ProfileIcon2 />
                            <div class="py-2">
                                {{ props.tweet.name }}
                                <i v-if="verified" class="bi bi-patch-check-fill text-primary ms-1 "></i>
                                <p class="card-text dark">@{{ props.tweet.userName }}</p>
                            </div>
                        </div>
                        <div class="col-6 ms-auto text-end d-flex justify-content-end align-items-center">
                            <button class="btn btn-light rounded-pill px-3 py-1"><strong>Subscribe</strong></button>
                            <span class="customSpan ms-1"><i class="bi bi-three-dots icon "></i></span>
                        </div>
                    </div>

                    <p v-if="props.tweet.message" class="card-text mb-2 text-break">{{ props.tweet.message }}</p>

                    <img v-if="props.tweet.file" :src="`http://127.0.0.1:8000/storage/${props.tweet.file}`"
                        class="mt-1 mb-2 card-img-bottom rounded-3" alt="...">

                    <!-- Date/Time -->
                    <div class="mb-2">
                        <span class="darkTime">{{ timeFormatted }}</span>
                        <span class="darkTime mx-1">&#183;</span>
                        <span class="darkTime">{{ dateFormatted }}</span>
                        <span class="darkTime mx-1">&#183;</span>
                        <span class="darkTime">{{ props.tweet.views }} Views</span>
                    </div>
                    <!-- Icons/Buttons -->
                    <hr class="my-1">
                    <div class="d-flex justify-content-between">
                        <TweetItemIcon :icon="iconComment" :num="numOfComments" />
                        <TweetItemIcon :icon="iconRetweet" :num="numOfShares" class="h5" />
                        <TweetItemIcon :icon="iconFavorite" :num="numOfLikes" class="heartIcon" />
                        <TweetItemIcon :icon="iconViews" :num="numOfViews" />
                        <span class="d-flex justify-content-end">
                            <TweetItemIcon :icon="iconBookmark" class="mx-2" />
                            <TweetItemIcon :icon="iconDownload" class="mx-2 d-none d-sm-inline" />
                        </span>
                    </div>
                    <hr class="my-1">

                </div>
            </div>
        </div>
        
        <!-- Tweeter form -->
        <TweetForm @addComment="addComment" @getCommentsAfterStore="getComments" class="ps-0" :parentTweetId="id" :notComment="false"
            :placeholder="placeholderText" :replyingTo="props.tweet.userName" />

        <!-- Loader/Spinner -->
        <LoaderComponent />

        <!-- Comments -->
        <TweetItems v-if="comments && (comments.length !== 0)" :comments="comments" />

        <!-- No Comments -->
        <div v-else-if="comments" class="text-center">
            <hr class="mx-3 my-0">
            <h4 class="mt-4">No Comments</h4>
            <p class="dark">Be the first to comment</p>
        </div>

        <!-- In Case Error -->
        <ErrorComponent v-else-if="errorComments" :message="errorMessage" :error="errorComments" />
        <div class="extender"></div>

    </div>
</template>

<style scoped>
.dark {
    color: gray;
    font-size: 14px;
}

.darkTime {
    color: gray;
    font-size: 16px;
}

.heartIcon {
    margin-top: 1px;
}

.card-img-bottom {
    width: 100%;
}

.cardCustom {
    padding-top: 13px
}

.customSpan {
    border-radius: 50%;
    padding: 5px;
    transition: background-color 0.3s;
    display: inline-flex;
}

.extender {
    height: 400px;
}

.customSpan:hover {
    background-color: #1f1f1f;
    cursor: pointer;
}

.customDiv {
    margin-top: 6px
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
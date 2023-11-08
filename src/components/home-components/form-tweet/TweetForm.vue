<script setup lang="ts">
import { ref, computed, type ComputedRef } from 'vue';
import IconForm from './IconForm.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import IconFormFileUpload from './IconFormFileUpload.vue'
import { useAutoResizeTextarea } from '../../../composables/resizeTextArea';
import { useStore } from "vuex"

//Props
const props = defineProps({
    notComment: { type: Boolean, default: true },
    placeholder: { type: String, default: "What is happening?!" },
    replyingTo: { type: String, default: "John Doe" },
    parentTweetId: { type: Number, default: null }
})

//To fix fragment issue
defineOptions({
    name: 'TweetForm',
    inheritAttrs: false,
})

//Emits
const emit = defineEmits(['getCommentsAfterStore','addComment'])

//Toggle line below textarea 
const store = useStore()

//Toggle preview image 
let selected = ref<boolean>(false)

//Toggle preview image 
const isImage = ref<boolean>(false)
//Url blob for image input preview
const fileUrl = ref<string>("");

//Form fields
const file = ref<any>(null);
const message = ref<string>("");
const userId = ref<number>(store.state.auth.user.id)

//Toggle post button active/disabled
const isDisabled: ComputedRef<boolean> = computed(() => message.value == "" && file.value === null);

//Text-area auto-resize
const textarea = ref<any>()
useAutoResizeTextarea(textarea)

//Icons bootstrap
const iconImg: string = 'bi-image';
const iconPoll: string = 'bi-bar-chart';
const iconEmoji: string = 'bi-emoji-smile';
const iconCalendar: string = 'bi-calendar-day';
const iconLocation: string = 'bi-geo-alt';

const toggleSelect = () => {
    selected.value = true;
}

const onChange = (event: any) => {
    toggleSelect();
    file.value = event.target.files[0];
    fileUrl.value = URL.createObjectURL(file.value)
    isImage.value = true
};

const postData = (form: FormData) => {
    store.dispatch(props.parentTweetId ? "auth/storeComment" : "auth/storeTweets", form).then(
        data => {
            if(props.parentTweetId){
                emit('getCommentsAfterStore')
                emit('addComment')
            }
            console.log("Tweet/Comment Stored: ", data)
            file.value = null;
            isImage.value = false;
            fileUrl.value = "";
            message.value = "";
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
const submit = async () => {
    let form = new FormData();
    if (isImage.value) {
        form.append('file', file.value);
    }
    if (props.parentTweetId) {
        form.append('tweet_id', `${props.parentTweetId}`);
    }
    form.append('message', message.value);
    form.append('user_id', `${userId.value}`);
    postData(form)
};
</script>


<template>
    <div v-if="!props.notComment && selected" class="dark" style="margin-left: 75px;">Replying to <span
            class="text-primary">{{ props.replyingTo }}</span></div>
    <div class="d-flex align-items-start">
        <ProfileIcon />
        <div class="container">
            <!-- <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div> -->
            <form enctype="multipart/form-data" @submit.prevent="submit">

                <!-- Text area (auto resize) -->
                <!-- If it is a comment form and is not selected show this -->
                <div v-if="!notComment && !selected" class="d-flex my-2 py-1 pb-3 align-items-center">
                    <textarea @click="toggleSelect"
                        class="d-inline ps-2 mt-0 auto-resize form-control-lg rounded-0 fakeTextArea" rows="1" type="text"
                        :placeholder="props.placeholder"></textarea>
                    <button type="submit" :class="isDisabled ? 'disabled' : 'active'"
                        class="btn btn-primary rounded-pill px-3 py-1 mt-1"><strong>Post</strong></button>
                </div>

                <textarea v-else @click="toggleSelect" :autofocus="selected" class="d-inline ps-2 auto-resize form-control-lg rounded-0"
                    style="width: 100%" ref="textarea" rows="1" type="text" v-model="message"
                    :placeholder="props.placeholder"></textarea>

                <!-- Image Preview (If Uploaded) -->
                <img v-if="isImage" :src="fileUrl" class="mx-3 rounded-3 videoImage" alt="img" />

                <!-- A line above the buttons (copying tweeter) -->
                <p v-if="selected && notComment" class="text-primary fw-bold p-2 mb-1" :class="selected ? 'selected' : ''">
                    <i class="bi bi-globe" style="margin-right: 5px;"></i>Everyone can reply
                </p>

                <!-- Hidden input  -->
                <input type="file" id="actual-btn" @change="onChange" accept="image/jpeg,image/png,image/jpg" hidden />

                <!-- Buttons (Only Upload Image implemented) -->
                <!-- Doesn't show before selected if comment -->
                <div v-if="notComment || selected" class="d-flex justify-content-end pb-3">
                    <IconFormFileUpload :class="iconImg" />
                    <span class="iButton" data-title="Gif"><i class="bi h6 text-primary"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-filetype-gif" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.278 13.124a1.403 1.403 0 0 0-.14-.492 1.317 1.317 0 0 0-.314-.407 1.447 1.447 0 0 0-.48-.275 1.88 1.88 0 0 0-.636-.1c-.361 0-.67.076-.926.229a1.48 1.48 0 0 0-.583.632 2.136 2.136 0 0 0-.199.95v.506c0 .272.035.52.105.745.07.224.177.417.32.58.142.162.32.288.533.377.215.088.466.132.753.132.268 0 .5-.037.697-.111a1.29 1.29 0 0 0 .788-.77c.065-.174.097-.358.097-.551v-.797H1.717v.589h.823v.255c0 .132-.03.254-.09.363a.67.67 0 0 1-.273.264.967.967 0 0 1-.457.096.87.87 0 0 1-.519-.146.881.881 0 0 1-.305-.413 1.785 1.785 0 0 1-.096-.615v-.499c0-.365.078-.648.234-.85.158-.2.38-.301.665-.301a.96.96 0 0 1 .3.044c.09.03.17.071.236.126a.689.689 0 0 1 .17.19.797.797 0 0 1 .097.25h.776Zm1.353 2.801v-3.999H3.84v4h.79Zm1.493-1.59v1.59h-.791v-3.999H7.88v.653H6.124v1.117h1.605v.638H6.124Z" />
                            </svg></i></span>
                    <IconForm v-if="props.notComment" :class="iconPoll" data-title="Poll" />
                    <IconForm :class="iconEmoji" data-title="Emoji" />
                    <IconForm v-if="props.notComment" :class="iconCalendar" data-title="Schedule"
                        class="d-none d-sm-inline" />
                    <IconForm :class="iconLocation" data-title="Location" class="d-none d-sm-inline" />
                    <i class="post"></i>
                    <button type="submit" :class="isDisabled ? 'disabled' : 'active'"
                        class="btn btn-primary rounded-pill px-3 py-1 mt-1 "><strong>Post</strong></button>
                </div>
            </form>
        </div>
    </div>
</template>


<style scoped>
textarea {
    background-color: black;
    color: white;
    border: none;
    resize: none;
    outline: none;
}

.selected {
    border-bottom: gray solid 1px;
}

.post {
    margin-left: auto;
}

.iButton:hover {
    background-color: rgb(8, 10, 26);
}

.uploading-image {
    display: flex;
}

.videoImage {
    width: 85%;
}

.iButton {
    border-radius: 100%;
    padding: 0px 7px 0px 7px;
    margin: 9px 2px 0 2px;
    cursor: pointer;
}

textarea {
    margin-top: 12px !important;
}

.fakeTextArea {
    width: 100%;
    margin-top: 0 !important
}

.dark {
    color: gray;
    font-size: 16px;
}
</style>
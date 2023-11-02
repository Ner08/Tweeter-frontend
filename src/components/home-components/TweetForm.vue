<script setup lang="ts">
import { ref, computed } from 'vue';
import IconForm from './IconForm.vue'
import IconFormFileUpload from './IconFormFileUpload.vue';
import ProfileIcon from '../other/ProfileIcon.vue';
import { fileURLToPath } from 'node:url';
import { postAPI } from '../../helpers/apiPost'

let selected = ref<boolean>(false)

const iconImg: string = 'bi-image';
const iconPoll: string = 'bi-bar-chart';
const iconEmoji: string = 'bi-emoji-smile';
const iconCalandar: string = 'bi-calendar-day';
const iconLocation: string = 'bi-geo-alt';

const toggleSelect = () => {
    selected.value = true;
}

const isFile = ref<boolean>(false)
const file = ref<fileURLToPath | null>(null);
const fileUrl = ref<fileURLToPath | null>(null)


const uploadFile = (event: any) => {
    const tmp = event.target.files[0];
    file.value = tmp
    fileUrl.value = URL.createObjectURL(tmp)
    isFile.value = true

    console.log("FileURL: ", fileUrl.value)

    console.log("File: ", file.value)
    console.log("Is File: ", isFile.value)
};

const submit = async () => {
    const reader: fileURLToPath | null = new FileReader();
    reader.readAsDataURL(file.value);
    reader.onload = async () => {
        const encodedFile = reader.result.split(",")[1];
        let form = new FormData();
        form.set('img', encodedFile);
        const data = {
            img: encodedFile,
        };
        try {
            const endpoint = "tweets";
            const response = ""; //axios
            console.log();
        } catch (error) {
            console.error(error);
        }
    };
}
</script>


<template>
    <div class="d-flex align-items-start">
        <ProfileIcon />
        <div class="container">
            <form method="POST" enctype="multipart/form-data">
                <img v-if="isFile" :src="fileUrl.value" class="w-75 mt-4 mx-3" />
                <textarea @click="toggleSelect" class="d-inline m-2 form-control-lg w-95 rounded-0" rows="1" type="text"
                    name="message" placeholder="What is happening?!" id="exampleFormControlTextarea1"></textarea>
                <p v-if="selected" class="text-primary fw-bold mx-3 p-2 mb-1" :class="selected ? 'selected' : ''"><i
                        class="bi bi-globe" style="margin-right: 5px;"></i>Everyone can reply</p>
                <input type="file" id="actual-btn" @change="uploadFile" accept="image/jpeg/png" hidden />
                <div class="d-flex justify-content-end px-3 pb-3">
                    <IconFormFileUpload :class="iconImg" />
                    <span class="iButton" data-title="Gif"><i class="bi h6 text-primary"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-filetype-gif" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.278 13.124a1.403 1.403 0 0 0-.14-.492 1.317 1.317 0 0 0-.314-.407 1.447 1.447 0 0 0-.48-.275 1.88 1.88 0 0 0-.636-.1c-.361 0-.67.076-.926.229a1.48 1.48 0 0 0-.583.632 2.136 2.136 0 0 0-.199.95v.506c0 .272.035.52.105.745.07.224.177.417.32.58.142.162.32.288.533.377.215.088.466.132.753.132.268 0 .5-.037.697-.111a1.29 1.29 0 0 0 .788-.77c.065-.174.097-.358.097-.551v-.797H1.717v.589h.823v.255c0 .132-.03.254-.09.363a.67.67 0 0 1-.273.264.967.967 0 0 1-.457.096.87.87 0 0 1-.519-.146.881.881 0 0 1-.305-.413 1.785 1.785 0 0 1-.096-.615v-.499c0-.365.078-.648.234-.85.158-.2.38-.301.665-.301a.96.96 0 0 1 .3.044c.09.03.17.071.236.126a.689.689 0 0 1 .17.19.797.797 0 0 1 .097.25h.776Zm1.353 2.801v-3.999H3.84v4h.79Zm1.493-1.59v1.59h-.791v-3.999H7.88v.653H6.124v1.117h1.605v.638H6.124Z" />
                            </svg></i></span>
                    <IconForm :class="iconPoll" data-title="Poll" />
                    <IconForm :class="iconEmoji" data-title="Emoji" />
                    <IconForm :class="iconCalandar" data-title="Schedule" class="d-none d-sm-inline" />
                    <IconForm :class="iconLocation" data-title="Location" class="d-none d-sm-inline" />
                    <i class="post"></i>
                    <button class="btn btn-primary rounded-pill px-3 py-1 mt-1 "><strong>Post</strong></button>

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

.iButton {
    border-radius: 100%;
    padding: 0px 7px 0px 7px;
    margin: 9px 2px 0 2px;
    cursor: pointer;
}

textarea {
    margin-top: 12px !important;
}
</style>
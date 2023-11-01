<script setup lang="ts">
import { ref } from 'vue'

let navTabYou = ref<boolean>(true);
let navTabFollowing = ref<boolean>(false);

const navTabChange = (dest: string) => {
    if (dest === 'you' && !navTabYou.value) {
        navTabYou.value = !navTabYou.value;
        navTabFollowing.value = !navTabFollowing.value;
    }
    if (dest === 'following' && !navTabFollowing.value) {
        navTabFollowing.value = !navTabFollowing.value;
        navTabYou.value = !navTabYou.value;
    }
}

</script>

<template>
    <div class="nav  text-center custom-border-bottom ">
        <span class="nav-item pt-1 navTab">
            <a @click="navTabChange('you')" class="nav-link text-secondary" :class="{ active: navTabYou }" href="#"><strong>For
                    you</strong></a>
            <hr v-if="navTabYou" class="text-primary rounded bg-primary mt-1 mb-0">
        </span>
        <span class="nav-item pt-1 navTab">
            <a @click="navTabChange('following')" class="nav-link text-secondary" :class="{ active: navTabFollowing }"
                href="#"><strong>Following</strong></a>
            <hr v-if="navTabFollowing" class="text-primary rounded bg-primary mt-1 mb-0">
        </span>
        <span class="nav-item navSettings">
            <i class="rounded bi bi-gear text-white h5"></i>
        </span>
    </div>
</template>

<style scoped>
.custom-border-bottom {
    border-bottom: thin solid rgb(51, 50, 50);
}

.navTab {
    width: 45%;
}

.navSettings {
    width: 8%;
    margin-top: 10px;
}

.navTab:hover {
    background-color: rgb(21, 21, 21);
}

hr {
    width: 80px;
    margin: auto;
    height: 4px;
    border-width: 0;
    opacity: 1;
}
.active{
    color: white !important;
}
</style>
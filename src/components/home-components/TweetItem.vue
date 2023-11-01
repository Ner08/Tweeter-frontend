<script setup lang="ts">
import ProfileIcon from '../other/ProfileIcon.vue';
import { RouterLink } from 'vue-router';

const img: string = 'e';

</script>

<template>
    <div class="card rounded-0 bg-black text-white border-dark">
        <div class="d-flex">
            <ProfileIcon />
            <div class="card-body">
                <span class="card-text">Nejc Robič</span>
                <span class="card-text mx-1 dark">@Nero</span>
                <i class="dark">‧</i>
                <span class="card-text mx-2 dark"><small>3 mins</small></span>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                    content.
                    This content is a little bit longer.</p>
                <img v-if="img !== ''" src="../../assets/images/image.jpeg" class="card-img-bottom rounded-4" alt="...">
                <div class="d-flex">
                    <RouterLink to="/"><i class="bi bi-chat"></i></RouterLink>
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
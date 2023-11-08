<script setup lang="ts">
import { ref } from 'vue';

const isHover = ref<boolean>(false);

const props = defineProps({
    icon: { type: String, required: true },
    num: { type: Number }
})
</script>

<template>
    <RouterLink class="text-secondary text-decoration-none" to="/" @mouseover="isHover = true" @mouseleave="isHover = false"
        style="cursor: pointer;">
        <i class="mx-1" :class="[props.icon, isHover ? 'text-white' : '']"></i>
        <span  class="small" :class="{ 'text-white': isHover }"><small>{{ props.num }}</small></span>
    </RouterLink>
</template>

<style scoped>
.small {
    font-size: 14px;
    text-decoration: none;
}
</style>
<script setup lang="ts">
import SideBarIcon from './SideBarIcon.vue';
import { RouterLink } from 'vue-router'

defineProps<{
    iconName: String
}>()

</script>

<template>
    <li class="nav-item mb-1">
        <router-link to="/" class="align-center btn rounded-circle">
            <SideBarIcon :class="iconName" />
        </router-link>
    </li>
</template>

<style></style>
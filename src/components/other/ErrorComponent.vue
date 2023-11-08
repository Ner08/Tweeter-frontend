
<script setup lang="ts">
import { AxiosError } from 'axios';

const props = defineProps({
    message: { type: String, required: true },
    error: { type: AxiosError, required: true }
})
</script>

<template>
    <div class="container text-white text-center p-3">
        <hr>
        <h3>{{ props.message }}</h3>
        <h1>{{ props.error.response?.status }}</h1>
        <p class="text-warning "><strong>{{ props.error.response?.statusText }}</strong></p>
        <hr>
    </div>
</template>

<style lang="scss" scoped></style>
<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const loading: ComputedRef = computed(() => store.state.auth.loading)
</script>

<template>
    <div v-if="loading" class="d-flex justify-content-center my-3">
        <div class="spinner-border text-primary " role="status">
            <span class="sr-only"></span>
        </div>
    </div>
</template>

<style scoped></style>
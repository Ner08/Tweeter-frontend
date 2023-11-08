<script setup lang="ts">
</script>

<template>
   <div class="d-flex position-sticky sticky-top text-white align-items-center stickyPost">
        <router-link class="align-self-center text-decoration-none rounded-circle customRouter" to="/"><i
                class="bi bi-arrow-left-short h3 text-white iconBack"></i></router-link>
        <h4 class="postText">Post</h4>
    </div>
</template>

<style scoped>
.stickyPost {
    height: 50px;
    padding-top: 8px;
    padding-left: 15px;
    display: flex;
    align-items: center;
}

.postText {
    padding: 0;
    padding-left: 25px;
}

.customRouter i {
    border-radius: 50%;
    padding: 4px;
    transition: background-color 0.3s;
}

.customRouter i:hover {
    background-color: #1f1f1f;
}

.iconBack {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
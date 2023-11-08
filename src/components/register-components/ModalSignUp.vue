<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '@/composables/custom-types';

const emit = defineEmits(['register'])

const name = ref<string>("")
const userName = ref<string>("")
const email = ref<string>("")
const password = ref<string>("")
const password_confirmation = ref<string>("")

const showPassword = ref<boolean>(false)
const showPasswordConfirmation = ref<boolean>(false)

const toggleShowPassword: any = () => {
    showPassword.value = !showPassword.value
}

const toggleShowPasswordConfirmation: any = () => {
    showPasswordConfirmation.value = !showPasswordConfirmation.value
}

const onSubmit = () => {
    const user: User = {
        name: name.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        exists: true
    }
    emit('register', user)
}

</script>

<template>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark rounded-4">

            <div class="d-flex justify-content-center flex-row m-2">
                <button type="button" class="btn-close btn-close-white btn text-left rounded-circle m-0"
                    data-bs-dismiss="modal" aria-label="Close"></button>
                <img class="img-fluid text-center logoModal mx-auto " src="../../assets/icons/twitterX.svg"
                    alt="TweeterLogo" />
            </div>


            <div class="d-flex flex-column justify-items-center align-items-center m-2">
                <h2>Sign in to X</h2>
                <form @submit.prevent="onSubmit">
                    <div class="form-group text-light p-2">
                        <label for="name">Name</label>
                        <input v-model="name" type="text" class="form-control" placeholder="Enter your name">
                    </div>
                    <div class="form-group text-light p-2">
                        <label for="username">User name</label>
                        <input v-model="userName" type="text" class="form-control" placeholder="Enter your username">
                    </div>
                    <div class="form-group text-light p-2">
                        <label for="email">Email address</label>
                        <input v-model="email" type="email" class="form-control" placeholder="Enter email">
                        <small class="form-text text-secondary">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div class="form-group text-light p-2">
                        <label for="password">Password</label>
                        <div class="d-flex">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                class="form-control rounded-end-0" placeholder="Password">
                            <span @click="toggleShowPassword" class="rounded-end-2 shadow p-1 px-2 hoverButton"><i
                                    class="bi bi-eye-slash text-black"
                                    :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i></span>
                        </div>

                    </div>
                    <div class="form-group text-light p-2">
                        <label for="password_confirmation">Confirm password</label>
                        <div class="d-flex">
                            <input v-model="password_confirmation" :type="showPasswordConfirmation ? 'text' : 'password'"
                                class="form-control rounded-end-0" placeholder="Confirm Password">
                            <span @click="toggleShowPasswordConfirmation"
                                class="rounded-end-2 shadow p-1 px-2 hoverButton"><i class="bi text-black"
                                    :class="showPasswordConfirmation ? 'bi-eye-slash' : 'bi-eye'"></i></span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-light rounded-pill p-1 mx-2 mt-4 "
                        style="width: 280px; color:rgb(42, 42, 42); margin-bottom: 8em;"
                        data-bs-dismiss="modal"><strong>Sign Up</strong></button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hoverButton {
    background-color: rgb(245, 245, 245);
    cursor: pointer;
}

.hoverButton:hover {
    background-color: rgb(230, 230, 230);
}

.text-left {
    margin-right: auto;
}

.text-center {
    margin-right: 50%;
    transform: translate(-50%);
}

.logoModal {
    width: 35px;
}

.closeButton {
    color: white border
}
</style>
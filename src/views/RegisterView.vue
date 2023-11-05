<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'bootstrap';

const store = useStore()

type User = {
    id?: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    password_confirmation?: string
    accessToken?: string;
}

const name = ref<string>("")
const userName = ref<string>("")
const email = ref<string>("")
const password = ref<string>("")
const password_confirmation = ref<string>("")

const errorMessageRegister = ref<string>("")
const errorMessageLogin = ref<string>("")


/* const elementSignUp = document.getElementById('signupModal') as HTMLElement;
const modalSignUp = new Modal(elementSignUp); */


const onSubmit = () => {
    const user: User = {
        name: name.value,
        username: userName.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value
    }
    store.dispatch("auth/register", user).then(
        () => {
            console.log("REGISTERED!")
            store.dispatch("auth/login", user).then(
                () => {
                    console.log("LOGGED IN!")
                    /* modalSignUp.dispose(); */
                },
                (error) => {
                    errorMessageLogin.value =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(errorMessageLogin.value, error.response)
                });
        },
        (error) => {
            errorMessageRegister.value =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(errorMessageRegister.value, error.response)
        });
}


</script>

<template>
    <!-- Signup/Login -->
    <div class="d-lg-flex align-items-center justify-items-center vh-100 bg-black ">
        <div class="d-flex justify-content-center container w-50 mb-5 pt-4  "><img class="img-fluid mw-100 logo"
                src="../assets/icons/twitterX.svg" alt="TweeterLogo" /></div>
        <div class="d-flex justify-content-center container w-50">
            <div class="p-4">
                <h1><strong>Happening now</strong></h1>
                <h2><strong>Join today.</strong></h2>
                <button type="button" class="btn btn-primary rounded-pill p-2 buttonSignup" data-bs-toggle="modal"
                    data-bs-target="#signupModal">
                    <strong>Create account</strong>
                </button>
                <p class="text-secondary p-1 ">By signing up, you agree to the <a class="text-decoration-none "
                        href="https://twitter.com/en/tos">Terms of Service</a> and <a class="text-decoration-none "
                        href="https://twitter.com/en/privacy">Privacy Policy</a>,
                    including <a class="text-decoration-none "
                        href="https://help.twitter.com/en/rules-and-policies/x-cookies">Cookie Use</a>.</p>
                <h5>Already have an account?</h5>
                <button type="button" class="btn btn-dark rounded-pill p-2 buttonLogin text-primary " data-bs-toggle="modal"
                    data-bs-target="#loginModal"><strong>Sign in</strong></button>
            </div>
        </div>
    </div>

    <!-- Modal Signup -->
    <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content bg-dark rounded-4">

                <div class="d-flex justify-content-center flex-row m-2">
                    <button type="button" class="btn-close btn-close-white btn text-left rounded-circle m-0"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                    <img class="img-fluid text-center logoModal mx-auto " src="../assets/icons/twitterX.svg"
                        alt="TweeterLogo" />
                </div>


                <div class="d-flex flex-column justify-items-center align-items-center m-2">
                    <h2>Sign in to X</h2>
                    <form @submit.prevent="onSubmit">
                        <div class="form-group text-light p-2">
                            <label for="name">Name</label>
                            <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter your name">
                        </div>
                        <div class="form-group text-light p-2">
                            <label for="username">User name</label>
                            <input v-model="userName" type="text" class="form-control" id="username"
                                placeholder="Enter your username">
                        </div>
                        <div class="form-group text-light p-2">
                            <label for="email">Email address</label>
                            <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-secondary">We'll never share your email with anyone
                                else.</small>
                        </div>
                        <div class="form-group text-light p-2">
                            <label for="password">Password</label>
                            <input v-model="password" type="password" class="form-control" id="password"
                                placeholder="Password">
                        </div>
                        <div class="form-group text-light p-2">
                            <label for="password_confirmation">Confirm password</label>
                            <input v-model="password_confirmation" type="password" class="form-control"
                                id="password_confirmation" placeholder="Confirm Password">
                        </div>
                        <button type="submit" class="btn btn-light rounded-pill p-1 mx-2 mt-4 "
                            style="width: 280px; color:rgb(42, 42, 42); margin-bottom: 8em;"
                            data-bs-dismiss="modal"><strong>Next</strong></button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Login -->
    <div class="modal fade" id="loginModal" tabindex="-1" data-backdrop="static" aria-labelledby="loginModal"
        aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 68px;
    color: rgb(240, 240, 240);
}

h2 {
    font-size: 35px;
    margin-top: 1.3em;
    margin-bottom: 1em;
    color: rgb(240, 240, 240);
}

h5 {
    font-size: 20px;
    color: rgb(240, 240, 240);
}

p {
    width: 270px;
    font-size: 12px;
    margin-left: 4px;
    margin-bottom: 5em;
}

.buttonSignup {
    width: 270px;
}

.buttonLogin {
    width: 270px;
    background-color: black
}

.buttonModal {
    width: 270px;
    background-color: rgb(150, 150, 150)
}

.buttonLogin:hover {
    background-color: rgb(15, 15, 24);
}

.logoModal {
    width: 35px;
}

.closeButton {
    color: white border
}


.text-left {
    margin-right: auto;
}

.text-center {
    margin-right: 50%;
    transform: translate(-50%);
}

@media (max-width: 991px) {
    .logo {
        width: 50px;
    }
}
</style>
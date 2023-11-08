<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex'
import ModalSignUp from '../components/register-components/ModalSignUp.vue'
import ModalLogin from '../components/register-components/ModalLogin.vue'
import type { User } from '@/composables/custom-types';
/* import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from 'bootstrap'; */

const store = useStore()

const errorMessageRegister = ref<string>("")
const errorMessageLogin = ref<string>("")

//Have to fix modal not closing dynamically when submit/login successful

/* const elementSignUp = document.getElementById('signupModal') as HTMLElement;
const modalSignUp = new Modal(elementSignUp); 
const elementLogin = document.getElementById('loginModal') as HTMLElement;
const modalLogin = new Modal(elementLogin);  */

const onSubmitRegister = (user: User) => {
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

const onSubmitLogin = (user: User) => {
    store.dispatch("auth/login", user).then(
        () => {
            console.log("LOGGED IN!")
            /* modalLogin.dispose(); */
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
    <div class="modal fade" id="signupModal" tabindex="-1" data-backdrop="static" aria-labelledby="signupModal"
        aria-hidden="true">
        <ModalSignUp @register="onSubmitRegister" />
    </div>

    <!-- Modal Login -->
    <div class="modal fade" id="loginModal" tabindex="-1" data-backdrop="static" aria-labelledby="loginModal"
        aria-hidden="true">
        <ModalLogin @login="onSubmitLogin" />
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

@media (max-width: 991px) {
    .logo {
        width: 50px;
    }
}
</style>
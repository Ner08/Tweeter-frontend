<script setup lang="ts">
import SideBarItem from './SideBarItem.vue';
import TwitterIcon from './icons/TwitterIcon.vue';
import { useStore } from 'vuex'
import { computed, type ComputedRef } from 'vue'
import type { User } from '@/composables/custom-types';

const iconHome: string = 'bi-house-door-fill';
const iconSearch: string = 'bi-search';
const iconNotifications: string = 'bi-bell';
const iconMessages: string = 'bi-envelope';
const iconLists: string = 'bi-journal-text'
const iconBookmarks: string = 'bi-bookmark text'
const iconCommunities: string = 'bi-people'
const iconPremium: string = 'bi-twitter'
const iconProfile: string = 'bi-person'
const iconMore: string = 'bi-three-dots'

const store = useStore();
const user: ComputedRef<User> = computed(() => store.state.auth.user);
console.log("User From store : ", user.value)

const onLogout = () => {
    store.dispatch("auth/logout", user.value)
}
</script>

<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <div class="col-2 col-md-2 col-lg-2 col-xl-3 col-xxl-4 bg-black custom-border-right column">
                <div class="d-flex flex-column align-items-center align-items-sm-end min-vh-100">

                    <!-- Sidebar Icons -->

                    <ul class="nav flex-column align-items-baseline  align-items-sm-end m-0 pt-1 p-2 p-lg-3 pt-lg-1"
                        id="menu">
                        <TwitterIcon />
                        <SideBarItem :iconName="iconHome" />
                        <SideBarItem :iconName="iconSearch" />
                        <SideBarItem :iconName="iconNotifications" />
                        <SideBarItem :iconName="iconMessages" />
                        <SideBarItem :iconName="iconLists" />
                        <SideBarItem :iconName="iconBookmarks" />
                        <SideBarItem :iconName="iconCommunities" />
                        <SideBarItem :iconName="iconPremium" />
                        <SideBarItem :iconName="iconProfile" />
                        <SideBarItem :iconName="iconMore" />
                    </ul>
                    <hr>
                    <div class="m-auto"></div>

                    <!-- User Icon and Name with Dropdown -->
                    <div class="dropdown mb-3 d-flex align-items-center text-white btn btn-outline-secondary border-0 rounded-pill outline-none "
                        id="dropdownUser1" data-bs-toggle="dropdown">
                        <img src="https://github.com/mdo.png" alt="avatar" width="40" height="40" class="rounded-circle">
                        <span class="d-none d-xl-inline mx-1">
                            <p class="mb-0">
                                <strong>{{ user.name }}</strong>
                            </p>
                            <p class="my-0"><small>@{{ user.userName }}</small></p>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-dark rounded border p-0"
                            style="background-color: rgb(5, 0, 0);">
                            <li><a class="dropdown-item btn btn-dark py-3 px-0 text-center" @click="onLogout">Logout
                                    @{{ user.userName }}</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Slot -->
            <slot />

            <!-- Right Column -->
            <div class="col d-none d-sm-block border-white overflow-auto ">

            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-border-right {
    border-right: thin solid rgb(46, 45, 45);
    min-width: 70px;
}

/* .dropdown-menu {
    position: absolute;
    z-index: 1000;
    min-width: 160px;
    white-space: nowrap;
    overflow: hidden;
}

/* Ensure the dropdown arrow indicator fits properly */
/* .dropdown-menu::after {
    display: none;
}


.custom-border-right .dropdown-menu {
    right: 0;
    left: auto;
    transform: translateX(calc(-100% + 15px));
} */
</style>
<script setup lang="ts">
import SideBarItem from './SideBarItem.vue';
import TwitterIcon from './TwitterIcon.vue'

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


/* defineProps<{
  
}>()
 */
</script>

<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <div class="col-auto col-md-2 col-lg-2 col-xl-2 col-xxl-3 bg-black custom-border-right column ">
                <div class="d-flex flex-column align-items-center align-items-sm-end min-vh-100">
                    <TwitterIcon />
                    <ul class="nav flex-column align-items-center align-items-sm-end" id="menu">
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
                    <div class="dropdown pb-3">
                        <a href="#"
                            class="d-flex align-items-center text-white btn btn btn-outline-secondary border-0 rounded-pill outline-none "
                            id="dropdownUser1" data-bs-toggle="dropdown">
                            <img src="https://github.com/mdo.png" alt="avatar" width="40" height="40"
                                class="rounded-circle">
                            <span class="d-none d-xl-inline mx-1">
                                <p class="mb-0">
                                    <strong>Nejc Robič</strong>
                                </p>
                                <p class="my-0"><small>@NejcRobic</small></p>
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark rounded border" style="background-color: rgb(5, 0, 0);">
                            <li><a class="dropdown-item btn btn-dark p-3 px-5 text-left" href="#">Add an existing account
                                </a></li>
                            <li><a class="dropdown-item btn btn-dark p-3 px-5 text-left" href="#">Logout @NejcRobic</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <slot />
            <div class="col d-none d-sm-block border-white overflow-auto ">

            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-border-right {
    border-right: thin solid rgb(46, 45, 45);
}
</style>
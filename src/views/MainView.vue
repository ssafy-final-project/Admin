<template>
  <div class="bg-gray-100 font-family-karla flex">
    <SideBarView></SideBarView>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SideBarView from './SideBarView.vue';
</script>

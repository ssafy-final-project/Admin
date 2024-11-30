<template>
  <aside class="min-h-screen h-dvh relative bg-sidebar w-64 hidden sm:block shadow-xl">
    <div class="p-6">
      <RouterLink to="/" class="text-white text-3xl font-semibold uppercase hover:text-gray-300"> Admin </RouterLink>
    </div>
    <nav class="text-white text-base font-semibold pt-3">
      <RouterLink to="/dashboard" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        Dashboard
      </RouterLink>
      <RouterLink to="/announce" class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
        Announce
      </RouterLink>
      <RouterLink
        :to="{ name: 'qna' }"
        class="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
      >
        QnA
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="min-h-screen bg-primary-light text-text-light dark:bg-primary-dark dark:text-text-dark transition-colors">
      <header class="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
        <h1 class="text-xl font-bold">Nuxt App</h1>
        <ThemeToggle />
      </header>
  
      <main class="p-4">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import ThemeToggle from '~/components/ThemeToggle.vue'
  </script>
  
<template>
    <button @click="toggleTheme" class="p-2 rounded-md border border-gray-300 dark:border-gray-600">
      <span v-if="isDarkMode">🌙</span>
      <span v-else>☀️</span>
    </button>
  </template>
  
  <script setup lang="ts">
  const colorMode = useColorMode()
  
  const isDarkMode = computed(() => colorMode.value === 'dark')
  
  const toggleTheme = () => {
    colorMode.value = isDarkMode.value ? 'light' : 'dark'
  }
  </script>
  
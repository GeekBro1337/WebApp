<template>
    <div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <UCard class="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Вход</h2>
  
        <!-- Уведомление об ошибке -->
        <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">
          {{ errorMessage }}
        </div>
  
        <UForm :state="formState" @submit="handleLogin">
          <div class="mb-4">
            <UInput type="email" v-model="formState.email" placeholder="Email" required />
          </div>
  
          <div class="mb-4">
            <UInput type="password" v-model="formState.password" placeholder="Пароль" required />
          </div>
  
          <UButton type="submit" color="primary" block :disabled="isLoading">
            <span v-if="isLoading">Вход...</span>
            <span v-else>Войти</span>
          </UButton>
        </UForm>
      </UCard>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useFetch, useRouter } from '#app'
  
  interface LoginFormState {
    email: string;
    password: string;
  }
  
  const router = useRouter()
  
  const formState = ref<LoginFormState>({
    email: '',
    password: ''
  })
  
  // Состояния
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  
  // Функция логина
  const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = null
  
    try {
      const { data, error } = await useFetch('/api/login', {
        method: 'POST',
        body: formState.value
      })
  
      if (error.value) {
        console.error('Ошибка входа:', error.value)
        errorMessage.value = error.value.statusMessage || 'Ошибка входа'
      } else {
        console.log('Успешный вход:', data.value)
        alert('Вход успешен! Перенаправление...')
        router.push('/') // Перенаправляем на главную страницу
      }
    } catch (err) {
      console.error('Ошибка сети:', err)
      errorMessage.value = 'Ошибка сети. Попробуйте позже.'
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
<template>
  <UCard class="max-w-md mx-auto p-6 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark">
    <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Регистрация</h2>

    <!-- Уведомление о статусе -->
    <div v-if="statusMessage" :class="statusType === 'error' ? 'text-red-500' : 'text-green-500'" class="mb-4 text-sm">
      {{ statusMessage }}
    </div>

    <UForm :state="formState" @submit="handleSubmit">
      <!-- Имя пользователя -->
      <div class="mb-4">
        <UInput v-model="formState.username" placeholder="Имя пользователя" required />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <UInput type="email" v-model="formState.email" placeholder="Email" required />
      </div>

      <!-- Пароль -->
      <div class="mb-4">
        <UInput
          type="password"
          v-model="formState.password"
          placeholder="Пароль (мин. 6 символов)"
          :class="{'border-red-500': errors.password}"
          required
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Повтор пароля -->
      <div class="mb-4">
        <UInput
          type="password"
          v-model="formState.confirmPassword"
          placeholder="Повторите пароль"
          :class="{'border-red-500': errors.confirmPassword}"
          required
        />
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
      </div>

      <!-- Кнопка с лоадером -->
      <UButton type="submit" color="primary" block :disabled="isLoading">
        <span v-if="isLoading">Регистрация...</span>
        <span v-else>Зарегистрироваться</span>
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch, useRouter } from '#app'

interface FormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const router = useRouter()

const formState = ref<FormState>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Объект для ошибок валидации
const errors = ref<{ [key: string]: string | null }>({
  password: null,
  confirmPassword: null
})

// Состояние загрузки и статусного сообщения
const isLoading = ref(false)
const statusMessage = ref<string | null>(null)
const statusType = ref<'success' | 'error' | null>(null)

// Функция валидации паролей
const validatePasswords = () => {
  errors.value.password = null
  errors.value.confirmPassword = null

  if (formState.value.password.length < 6) {
    errors.value.password = 'Пароль должен содержать не менее 6 символов'
  }
  if (formState.value.password !== formState.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают'
  }

  return !errors.value.password && !errors.value.confirmPassword
}

// Функция отправки формы на сервер
const handleSubmit = async () => {
  if (!validatePasswords()) return

  isLoading.value = true
  statusMessage.value = null

  try {
    const { data, error } = await useFetch('/api/register', {
      method: 'POST',
      body: formState.value
    })

    if (error.value) {
      console.error('Ошибка регистрации:', error.value)
      statusMessage.value = error.value.statusMessage || 'Ошибка регистрации'
      statusType.value = 'error'
    } else {
      console.log('Успешная регистрация:', data.value)
      statusMessage.value = 'Регистрация успешна! Перенаправление...'
      statusType.value = 'success'

      // Ждём 2 секунды перед редиректом
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (err) {
    console.error('Ошибка отправки запроса:', err)
    statusMessage.value = 'Ошибка сети. Попробуйте позже.'
    statusType.value = 'error'
  } finally {
    isLoading.value = false
  }
}
</script>

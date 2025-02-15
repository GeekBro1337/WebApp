<template>
  <div class="flex items-center space-x-3">
    <div v-if="showAvatar" class="relative">
      <UAvatar v-if="avatarSrc" :src="avatarSrc" :alt="username" :size="avatarSize" />
      <UAvatar v-else :alt="username" :size="avatarSize" class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        {{ username.charAt(0).toUpperCase() }}
      </UAvatar>
      <div
        v-if="showStatus"
        class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
        :style="{ backgroundColor: statusColor }"
      />
    </div>
    <span v-if="showName" class="text-base font-medium text-gray-800 dark:text-gray-200">
      {{ username }}
    </span>
  </div>
</template>

<script setup lang="ts">
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps({
  username: { type: String, default: '' },
  avatarSrc: { type: String, default: '' },
  statusColor: { type: String, default: '#808080' },
  showStatus: { type: Boolean, default: false },
  showName: { type: Boolean, default: true },
  showAvatar: { type: Boolean, default: true },
  avatarSize: { type: String as () => AvatarSize, default: 'md' }
})
</script>

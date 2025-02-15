<template>
  <UCard class="max-w-sm p-4 bg-primary-light text-text-light dark:bg-primary-dark dark:text-text-dark transition-colors border border-gray-200 dark:border-gray-700">
    <div class="flex items-center mb-4">
      <UserAvatar
        :username="username"
        :avatarSrc="avatarSrc"
        :showName="false"
        :showStatus="showStatus"
        :statusColor="statusColor"
        avatarSize="lg"
      />
      <div class="ml-3">
        <h2 class="text-lg font-semibold">{{ username }}</h2>
      </div>
    </div>

    <div class="mb-4" v-if="sortedTags.length">
      <label class="block mb-1 text-gray-500 dark:text-gray-300 text-sm">Теги:</label>
      <div class="flex flex-wrap gap-2">
        <div v-for="(tag, i) in displayedTags" :key="i">
          <UBadge
            size="sm"
            variant="solid"
            class="text-white"
            :style="{ backgroundColor: tag.color }"
          >
            {{ tag.name }}
          </UBadge>
        </div>
        <UBadge
          v-if="additionalTagsCount > 0 && !showAllTags"
          class="cursor-pointer text-white"
          size="sm"
          variant="solid"
          @click="showAllTags = true"
        >
          +{{ additionalTagsCount }}
        </UBadge>
      </div>
    </div>

    <div v-if="sortedGroups.length">
      <label class="block mb-1 text-gray-500 dark:text-gray-300 text-sm">Группы:</label>
      <div class="flex flex-wrap gap-2">
        <div v-for="(group, i) in displayedGroups" :key="i">
          <UBadge
            size="sm"
            variant="outline"
            class="border border-gray-500 dark:border-gray-300"
            :style="{ color: group.color, borderColor: group.color }"
          >
            {{ group.name }}
          </UBadge>
        </div>
        <UBadge
          v-if="additionalGroupsCount > 0 && !showAllGroups"
          class="cursor-pointer border border-gray-500 dark:border-gray-300"
          size="sm"
          variant="outline"
          @click="showAllGroups = true"
        >
          +{{ additionalGroupsCount }}
        </UBadge>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'

interface TagGroupItem {
  name: string
  color: string
  priority: number
}

const props = defineProps({
  username: { type: String, default: '' },
  avatarSrc: { type: String, default: '' },
  statusColor: { type: String, default: '#808080' },
  showStatus: { type: Boolean, default: false },
  tags: { type: Array as () => TagGroupItem[], default: () => [] },
  groups: { type: Array as () => TagGroupItem[], default: () => [] }
})

const ITEMS_LIMIT = 4
const showAllTags = ref(false)
const showAllGroups = ref(false)

const sortedTags = computed(() => [...props.tags].sort((a, b) => b.priority - a.priority))
const displayedTags = computed(() => showAllTags.value ? sortedTags.value : sortedTags.value.slice(0, ITEMS_LIMIT))
const additionalTagsCount = computed(() => Math.max(0, sortedTags.value.length - ITEMS_LIMIT))

const sortedGroups = computed(() => [...props.groups].sort((a, b) => b.priority - a.priority))
const displayedGroups = computed(() => showAllGroups.value ? sortedGroups.value : sortedGroups.value.slice(0, ITEMS_LIMIT))
const additionalGroupsCount = computed(() => Math.max(0, sortedGroups.value.length - ITEMS_LIMIT))
</script>

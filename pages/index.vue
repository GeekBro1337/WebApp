<template>
  <div class="p-4">
    <div class="inline-block cursor-pointer" @click="toggleCard">
      <UserAvatar
        :username="userData.username"
        :avatarSrc="userData.avatarSrc"
        :statusColor="userData.statusColor"
        :showStatus="true"
        :showName="true"
      />
    </div>

    <div v-if="showCard" class="mt-4">
      <UserCard
        :username="userData.username"
        :avatarSrc="userData.avatarSrc"
        :statusColor="userData.statusColor"
        :showStatus="true"
        :tags="userTags"
        :groups="userGroups"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserAvatar from '~/components/UserAvatar.vue'
import UserCard from '~/components/UserCard.vue'

const showCard = ref(false)
function toggleCard() { showCard.value = !showCard.value }

const userData = {
  username: 'AdminUser',
  avatarSrc: 'https://i.pravatar.cc/100?img=13',
  statusColor: '#4caf50'
}

const userTags = [
  { name: 'Full-stack Dev', color: '#3498db', priority: 10 },
  { name: 'Mentor', color: '#9b59b6', priority: 8 },
  { name: 'Streamer', color: '#ff7f50', priority: 3 },
  { name: 'Artist', color: '#16a085', priority: 7 },
  { name: 'Helper', color: '#e67e22', priority: 1 }
]

const userGroups = [
  { name: 'Admins', color: '#e74c3c', priority: 15 },
  { name: 'Designers', color: '#2ecc71', priority: 5 },
  { name: 'Developers', color: '#f1c40f', priority: 10 },
  { name: 'Managers', color: '#8e44ad', priority: 12 },
  { name: 'Contributors', color: '#2980b9', priority: 2 }
]
</script>

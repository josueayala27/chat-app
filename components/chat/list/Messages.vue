<script lang="ts" setup>
interface Message {
  id: number
  name: string
  message: string
}

const messages = ref<Message[]>([
  { id: 1, name: 'Alice', message: 'Hello there!' },
  { id: 2, name: 'Bob', message: 'How are you?' },
  { id: 3, name: 'Charlie', message: 'Good morning!' },
  { id: 4, name: 'David', message: 'What\'s up?' },
  { id: 5, name: 'Eve', message: 'See you later!' },
])
</script>

<template>
  <div class="flex flex-col gap-1">
    <ChatListItem v-for="item in messages" :key="item.id" :name="item.name" :message="item.message" />
  </div>
</template>

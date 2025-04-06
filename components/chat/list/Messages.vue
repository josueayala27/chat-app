<script lang="ts">
interface MessageProps {
  id: string
  name: string
  message: string
}
</script>

<script lang="ts" setup>
const messages = ref<MessageProps[]>([
  { id: '378ae97b-d6c6-4ec4-bf39-2aaae75bd514', name: 'Alice', message: 'Hello there!' },
  { id: '86b765de-b5ef-4334-a040-28bd1a46c5ad', name: 'Bob', message: 'How are you?' },
  { id: '1a7895ee-d744-4f81-9aa9-c16f14463232', name: 'Charlie', message: 'Good morning!' },
  { id: '5857f77a-f5cc-410c-9871-1d5651427d96', name: 'David', message: 'What\'s up?' },
  { id: '4fd8a65d-de60-43ed-89bd-343359c9989f', name: 'Eve', message: 'See you later!' },
])
</script>

<template>
  <div class="flex flex-col gap-1">
    <ChatListItem v-for="item in messages" :key="item.id" :name="item.name" :message="item.message" />
  </div>
</template>

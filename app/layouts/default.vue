<script setup lang="ts">
import type { ChatList } from '@/types/chat'

const headers = useRequestHeaders(['cookie'])
await useAsyncData('api-chats', () => $fetch<ChatList[]>('/api/chats', { headers }))
</script>

<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <Sidebar v-if="true" />

    <main class="flex-1 flex divide-x divide-slate-200 overflow-hidden">
      <slot />
    </main>
  </div>
</template>

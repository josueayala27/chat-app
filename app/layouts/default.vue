<script setup lang="ts">
const headers = useRequestHeaders(['cookie'])
await useAsyncData('chat-list', () => $fetch('/api/chats', { headers }))
</script>

<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <Sidebar />

    <main class="flex-1 flex divide-x divide-slate-200">
      <slot />
    </main>
  </div>
</template>

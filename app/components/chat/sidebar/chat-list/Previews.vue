<script lang="ts">
import type { ChatList } from '@/types/chat'
</script>

<script lang="ts" setup>
const { data } = useNuxtData<ChatList[]>('api-chats')
</script>

<template>
  <BaseList>
    <SidebarChatListItem v-for="item in data" :key="item._id" :item />
  </BaseList>
</template>

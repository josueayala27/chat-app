<script lang="ts">
import { NuxtLink } from '#components'
</script>

<script lang="ts" setup>
const { friends } = useFriends()
</script>

<template>
  <BaseList>
    <SidebarChatItem
      :is="NuxtLink"
      v-for="{ name, status, uuid } in friends"
      :key="uuid"
      :to="{ name: 'chat', params: { chat: uuid } }"
      :data="[name, status]"
    />
  </BaseList>
</template>

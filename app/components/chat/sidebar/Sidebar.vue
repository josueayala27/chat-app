<script lang="ts" setup>
import type { ConcreteComponent } from 'vue'

const { layout } = useSidebar()

const sidebarComponents: Record<LayoutKeys, string | ConcreteComponent> = {
  'chat-list': resolveComponent('SidebarChatList'),
  'new-friend': resolveComponent('SidebarNewFriend'),
  'new-message': resolveComponent('SidebarNewMessage'),
  'starred-messages': '',
}
</script>

<template>
  <aside class="w-95 p-2 shrink-0 flex flex-col gap-3 overflow-auto scrollbar-hidden">
    <SidebarToolbar />

    <component :is="sidebarComponents[layout]" />
  </aside>
</template>

<script lang="ts" setup>
import type { ConcreteComponent } from 'vue'

const { layout } = useSidebar()

const sidebarComponents: Record<LayoutKeys, string | ConcreteComponent> = {
  'list': resolveComponent('ChatSidebarList'),
  'new-friend': resolveComponent('ChatSidebarNewFriend'),
  'new-group': '',
  'new-message': resolveComponent('ChatSidebarNewMessage'),
  'starred-messages': '',
}
</script>

<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <ChatSidebar>
      <component :is="sidebarComponents[layout]" />
    </ChatSidebar>

    <div class="flex-1 flex divide-x divide-slate-200">
      <slot />
    </div>
  </div>
</template>

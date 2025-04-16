<script lang="ts">
import type { ChatListMessage } from './Previews.vue'
import { ChatSidebarChatItem, NuxtLink } from '#components'

interface ChatListItemProps extends ChatListMessage {
  isPinned: boolean
  isRead: boolean
}

// type NuxtLinkProps = InstanceType<typeof NuxtLink>['$props']
</script>

<script lang="ts" setup>
defineProps<Partial<ChatListItemProps>>()

const item = ref<InstanceType<typeof ChatSidebarChatItem> | null>(null)
</script>

<template>
  <ChatSidebarChatItem
    :is="NuxtLink"
    ref="item"
    :to="{ name: 'chat', params: { chat: uuid } }"
    :data="[String(name), String(message)]"
    :ui="{ header: 'flex items-center justify-between w-full', subheader: 'flex items-center gap-1', content: 'relative' }"
  >
    <template #header="{ content }">
      <BaseFont :content="`${content}hello`" />
      <BaseFont class="text-xs text-neutral-500 font-normal" content="8:10 PM" />
    </template>

    <template #subheader="{ content }">
      <Icon class="shrink-0" size="20px" name="carbon:checkmark" />
      <BaseFont :content="content" />
    </template>

    <template #extra>
      <BasePopover>
        <template #default="{ isOpen }">
          <div
            :class="{ 'visible not-group-hover:bg-white': isOpen }"
            class="absolute right-0 top-0 flex items-center h-full bg-slate-100 mask-l-from-60% mask-l-to-90% w-[20%] justify-end invisible group-hover:visible"
          >
            <div
              class="p-2 rounded-full bg-white place-items-center cursor-pointer border border-slate-300" @click.prevent
            >
              <Icon size="20px" name="carbon:overflow-menu-horizontal" class="flex shrink-0" />
            </div>
          </div>
        </template>

        <template #content>
          <BaseMenuContainer>
            <BaseMenuItem icon="carbon:pin" label="Pin chat" />
            <BaseMenuItem icon="carbon:star" label="Add to favorites" />
            <BaseMenuItem icon="carbon:notification-off" label="Mute" />
            <BaseMenuItem icon="carbon:locked" label="Block" />
            <BaseMenuItem :ui="{ root: 'text-red-500' }" icon="carbon:trash-can" label="Delete chat" />
          </BaseMenuContainer>
        </template>
      </BasePopover>
    </template>
  </ChatSidebarChatItem>
</template>

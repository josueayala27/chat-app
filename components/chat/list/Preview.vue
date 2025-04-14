<script lang="ts">
import type { ChatListMessage } from './ChatListPreviews.vue'

interface ChatListItemProps extends ChatListMessage {
  isPinned: boolean
  isRead: boolean
}
</script>

<script lang="ts" setup>
defineProps<Partial<ChatListItemProps>>()
</script>

<template>
  <NuxtLink
    :to="{ name: 'chat', params: { chat: uuid } }"
    class="flex rounded-lg p-2 gap-2 items-center cursor-pointer hover:bg-slate-100 group"
  >
    <BaseAvatar />
    <div class="flex flex-col text-sm w-full">
      <div class="flex justify-between items-center">
        <BaseFont class="text-slate-900 font-bold" :content="name" />
        <span class="text-xs text-slate-500 font-medium">21:35</span>
        <Icon v-if="isRead" name="carbon:checkmark" />
      </div>

      <div class="flex justify-between items-center gap-1">
        <BaseFont class="line-clamp-1 text-slate-500" :content="message" />
        <div class="flex gap-2 items-center ">
          <Icon v-if="isPinned" name="carbon:pin" />

          <BasePopover>
            <div class="flex items-center justify-center invisible group-hover:visible" @click.prevent>
              <Icon size="16px" name="carbon:chevron-down" />
            </div>

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
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

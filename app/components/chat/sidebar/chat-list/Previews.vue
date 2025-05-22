<script lang="ts">
import type { ChatList } from '@/types/chat'
import { NuxtLink } from '#components'
</script>

<script lang="ts" setup>
const { $ably } = useNuxtApp()
const { data } = useNuxtData<ChatList[]>('chat-list')

onMounted(() => {
  const channel = $ably.channels.get(`channel:${'user.value._id'}`)

  channel.subscribe('message', (message) => {
    console.log(message)
  })
})
</script>

<template>
  <BaseList>
    <SidebarChatItem
      :is="NuxtLink"
      v-for="item in data"
      :key="item._id"
      :to="{ name: 'chat', params: { chat: item._id } }"
      :ui="{ header: 'flex items-center justify-between w-full', subheader: 'flex items-center gap-1', content: 'relative' }"
    >
      <template #header>
        <BaseFont :content="item.type === 'private' ? `${item.friend?.first_name} ${item.friend?.last_name}` : item.name" />

        <BaseFont class="text-xs text-slate-500 font-normal">
          <NuxtTime :datetime="item.last_message.created_at" hour="2-digit" minute="2-digit" time-zone="America/El_Salvador" />
        </BaseFont>
      </template>

      <template #subheader>
        <Icon class="shrink-0" size="20px" name="carbon:checkmark" />
        <BaseFont :content="item.last_message.content" />
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
    </SidebarChatItem>
  </BaseList>
</template>

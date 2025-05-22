<script lang="ts">
import type { Message as AblyMessage, RealtimeChannel } from 'ably'
import type { ChatList } from '~/types/chat'
import type { Message as ChatMessage } from '~/types/message'
import { NuxtLink } from '#components'
</script>

<script setup lang="ts">
const props = defineProps<{ item: ChatList }>()

/**
 * Accesses the Ably Realtime client from the Nuxt application context.
 * @type {Ably.Realtime}
 */
const { $ably } = useNuxtApp()

/**
 * Retrieves the authenticated user information.
 * @type {object}
 * @property {Ref<User>} user - The current authenticated user.
 */
const { user } = useAuth()

/**
 * Lifecycle hook that runs after the component is mounted.
 * Sets up a subscription to the Ably channel for real-time message handling.
 */
onMounted(() => {
  /**
   * Retrieves the Ably channel corresponding to the chat item.
   * @type {RealtimeChannel}
   */
  const channel: RealtimeChannel = $ably.channels.get(`channel:${props.item._id}`)

  /**
   * Subscribes to the 'message' event on the Ably channel.
   * Processes incoming messages and logs them if they are from other users.
   * @param {Ably.Types.Message} message - The incoming message from the channel.
   */
  channel.subscribe('message', (message: AblyMessage) => {
    const data = message.data as ChatMessage

    if (data.sender_id !== user.value._id) {
      console.log(message)
    }

    console.log(props.item)
  })
})
</script>

<template>
  <SidebarChatItem
    :is="NuxtLink"
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
</template>

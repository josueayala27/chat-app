<script lang="ts">
import type { Message as AblyMessage, RealtimeChannel } from 'ably'
</script>

<script lang="ts" setup>
const { $ably } = useNuxtApp()
const { reference, closePopover } = usePopover()
const route = useRoute()

/**
 * Retrieves the authenticated user information.
 * @type {object}
 * @property {Ref<User>} user - The current authenticated user.
 */
const { user } = useAuth()

const isTyping = ref<boolean>(false)
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)

function onSelectMessages() {
  closePopover()
  isSelectMessagesActive.value = true
}

/**
 * Lifecycle hook that runs after the component is mounted.
 * Sets up a subscription to the Ably channel for real-time message handling.
 */
onMounted(() => {
  /**
   * Retrieves the Ably channel corresponding to the chat item.
   * @type {RealtimeChannel}
   */
  const channel: RealtimeChannel = $ably.channels.get(`channel:${route.params.chat}`)

  /**
   * Subscribes to the 'event:start-typing' event on the Ably channel.
   * Updates the `isTyping` reactive flag when another user begins typing.
   *
   * @param {Ably.Types.Message} message - The incoming Ably message.
   * @param {{ user_id: string, is_typing: boolean }} message.data - Payload containing the ID of the user who is typing and their typing status.
   */
  channel.subscribe('event:start-typing', (message: AblyMessage) => {
    const data = message.data as { user_id: string, is_typing: boolean }

    if (data.user_id !== user.value._id) {
      isTyping.value = data.is_typing
    }
  })

  /**
   * Subscribes to the 'event:stop-typing' event on the Ably channel.
   * Resets the `isTyping` reactive flag when typing stops.
   *
   * @param {Ably.Types.Message} [message] - (Optional) The incoming Ably message, not used in this handler.
   */
  channel.subscribe('event:stop-typing', () => {
    isTyping.value = false
  })
})
</script>

<template>
  <div class="p-2 flex items-center justify-between">
    <div class="flex rounded-lg gap-2 items-center cursor-pointergroup">
      <BaseAvatar />
      <div class="flex flex-col text-sm">
        <BaseFont content="Josué Ayala" class="font-medium" />
        <BaseFont v-if="isTyping" content="Typing..." class="text-xs text-slate-700" />
      </div>
    </div>
    <div class="flex items-center">
      <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
        <Icon size="20px" name="carbon:search" />
      </div>
      <BasePopover ref="reference" :config="{ placement: 'bottom-end' }">
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="carbon:overflow-menu-horizontal" />
        </div>

        <template #content>
          <BaseMenuContainer>
            <BaseMenuItem icon="carbon:information" label="Contact info" />
            <BaseMenuItem
              v-if="!isSelectMessagesActive"
              icon="carbon:checkmark-outline"
              label="Select Messages"
              @click="onSelectMessages()"
            />
            <BaseMenuItem icon="carbon:notification-off" label="Mute" />
            <BaseMenuItem icon="carbon:locked" label="Block" />
            <BaseMenuItem :ui="{ root: 'text-red-500' }" icon="carbon:trash-can" label="Delete chat" />
          </BaseMenuContainer>
        </template>
      </BasePopover>
    </div>
  </div>
</template>

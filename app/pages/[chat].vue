<script lang="ts">
import type { WindowMain } from '#components'
import type { Message as AblyMessage, RealtimeChannel } from 'ably'
import type { ChatMessage } from '~/types/message'
import type { User } from '~/types/user'
import { entries, groupBy, mapValues, pipe, sortBy } from 'remeda'

export type WindowMainInstance = InstanceType<typeof WindowMain>
</script>

<script setup lang="ts">
useHead({ title: 'Charlie' })
definePageMeta({ middleware: ['auth'], key: route => route.fullPath, keepalive: true })

const { $ably } = useNuxtApp()
const route = useRoute('chat')
const chats = useState<ChatState>('chats')
const { getConversation, getBeforeConversation, cursors, concatRecentMessage } = useChat()

function formatDateLocal(iso: Date) {
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/El_Salvador',
  })
    .format(new Date(iso))
    .replace(/-/g, '-')
}

/**
 * Groups chat messages by date and then by sender,
 * returning a structured array ideal for chat UIs.
 *
 * @param {ChatMessage[]} messages - Array of chat messages to group and transform.
 * @returns {{
 *   date: string,
 *   senders: {
 *     sender_id: Pick<User, '_id' | 'first_name' | 'last_name'>
 *     messages: ChatMessage[]
 *   }[]
 * }[]} Array grouped by date and sender, ready for UI rendering.
 */
function groupAndTransform(messages: ChatMessage[]): {
  date: string
  senders: {
    sender_id: Pick<User, '_id' | 'first_name' | 'last_name'>
    messages: ChatMessage[]
  }[]
}[] {
  return pipe(
    messages,

    /**
     * Sort by creation date.
     */
    sortBy(({ created_at }) => created_at),

    /**
     * Group by local-formatted date.
     */
    groupBy(({ created_at }) => formatDateLocal(created_at)),

    /**
     * Group each day's messages by sender's _id.
     */
    mapValues(msgs => groupBy(msgs, ({ sender_id }) => sender_id._id)),

    /**
     * Transform to array shape, preserving sender info.
     * @param _
     */
    _ => entries(_).map(([date, senders]) => ({
      date,
      senders: entries(senders).map(([id, messages]) => ({
        sender_id: messages[0].sender_id,
        messages,
      })),
    })),
  )
}

const windowMain = ref<WindowMainInstance | null>(null)

const computedChat = computed(() => {
  return groupAndTransform(chats.value[`channel:${route.params.chat}`]!)
})

// TODO: Validate the last cursor 🚩
async function loadOlderMessages() {
  const before = cursors.value[`channel:${route.params.chat}`]
  await getBeforeConversation(before)
}

onMounted(() => {
  /**
   * Retrieves the Ably channel corresponding to the chat item.
   * @type {RealtimeChannel}
   */
  const channel: RealtimeChannel = $ably.channels.get(`channel:${route.params.chat}`)

  /**
   * Subscribes to the 'message' event on the Ably channel.
   * Processes incoming messages and logs them if they are from other users.
   * @param {Ably.Types.Message} message - The incoming message from the channel.
   */
  channel.subscribe('event:new-message', (message: AblyMessage) => {
    const data = message.data as ChatMessage
    concatRecentMessage(data)
    // if (data.sender_id !== user.value._id) {
    //   console.log(message)
    // }
  })
})

await getConversation()
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1 overflow-hidden">
    <WindowHeader />

    <WindowMain ref="windowMain" :fetch-older="loadOlderMessages">
      {{ chats }}

      <template v-for="(group, j) in computedChat" :key="j">
        <div class="flex justify-center">
          <BaseFont class="text-xs bg-slate-100 px-2 py-1 rounded-full font-medium select-none">
            <NuxtTime :datetime="group.date" />
          </BaseFont>
        </div>

        <WindowMessagesGroup v-for="({ sender_id, messages: _messages }, k) in group.senders" :key="k" :messages="_messages" :sender="sender_id" />
      </template>
    </WindowMain>

    <WindowFooter />
  </div>

  <WindowPanel v-if="true">
    <PanelInfo />
  </WindowPanel>
</template>

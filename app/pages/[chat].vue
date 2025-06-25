<script lang="ts">
import type { WindowMain } from '#components'
import type { Message as AblyMessage, RealtimeChannel } from 'ably'
import type { ChatMessage } from '~/types/message'
import type { User } from '~/types/user'
import { entries, groupBy, map, mapValues, pipe, reduce, sortBy } from 'remeda'

export type WindowMainInstance = InstanceType<typeof WindowMain>
</script>

<script setup lang="ts">
useHead({ title: 'Charlie' })
definePageMeta({ middleware: ['auth'], key: route => route.fullPath, keepalive: true })

const { $ably } = useNuxtApp()
const route = useRoute('chat')
const chats = useState<ChatState>('chats')
const { getConversation, getBeforeConversation, cursors } = useChat()

/**
 * Groups chat messages by date (UTC) and consecutive sender messages,
 * preserving the conversational order.
 *
 * @param messages Array of chat messages
 * @returns Structured array grouped by date and sender message groups
 */
function groupAndTransform(messages: ChatMessage[]) {
  return pipe(
    messages,
    sortBy(msg => new Date(msg.created_at).getTime()),
    groupBy(msg => new Date(msg.created_at).toISOString().split('T')[0]),
    mapValues((msgs) => {
      return reduce(
        msgs,
        (acc, msg) => {
          const lastGroup = acc[acc.length - 1]

          if (lastGroup?.sender_id._id === msg.sender_id._id) {
            lastGroup.messages.push(msg)
          }
          else {
            acc.push({ sender_id: msg.sender_id, messages: [msg] })
          }
          return acc
        },
        [] as Array<{
          sender_id: Pick<User, '_id' | 'first_name' | 'last_name'>
          messages: ChatMessage[]
        }>,
      )
    }),
    entries(),
    map(([date, groups]) => ({ date, groups })),
  )
}

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
    // addLastMessage(data)
    // if (data.sender_id !== user.value._id) {
    //   console.log(message)
    // }
  })
})

await getConversation()

const _window = ref<WindowMainInstance | undefined>()
provide<Ref<WindowMainInstance | undefined>>('window', _window)
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1 overflow-hidden">
    <WindowHeader />

    <WindowMain ref="_window" :fetch-older="loadOlderMessages">
      <template v-for="(group, j) in computedChat" :key="j">
        <div class="flex justify-center">
          <BaseFont class="text-xs bg-slate-100 px-2 py-1 rounded-full font-medium select-none">
            <NuxtTime :datetime="group.date" />
          </BaseFont>
        </div>

        <WindowMessagesGroup v-for="({ sender_id, messages: _messages }, k) in group.groups" :key="k" :messages="_messages" :sender="sender_id" />
      </template>
    </WindowMain>

    <WindowFooter />
  </div>

  <WindowPanel v-if="false">
    <PanelInfo />
  </WindowPanel>
</template>

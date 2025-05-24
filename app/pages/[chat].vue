<script lang="ts">
import type { ChatMessage } from '~/types/message'
import type { User } from '~/types/user'

interface SenderGroup {
  sender_id: Pick<User, '_id' | 'first_name' | 'last_name'>
  messages: ChatMessage[]
}

interface GroupedMessages {
  date: string
  senders: Record<string, SenderGroup>
}
</script>

<script setup lang="ts">
useHead({ title: 'Charlie' })
definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)

onUnmounted(() => {
  isSelectMessagesActive.value = false
})

const headers = useRequestHeaders(['cookie'])

/**
 * Get the date portion (YYYY-MM-DD) of a Date or ISO string.
 *
 * @param date - a Date object or ISO timestamp
 * @returns date string like "2025-05-22"
 */
function getISODateKey(date: Date | string): string {
  return new Date(date).toISOString().split('T')[0]!
}

/**
 * Sort messages ascending by their `created_at` timestamp.
 *
 * @param messages - array of Message objects
 * @returns new sorted array
 */
function sortMessagesByDate(messages: ChatMessage[]): ChatMessage[] {
  return [...messages].sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  )
}

/**
 * Build a nested map of messages by date and sender.
 *
 * @param sorted - messages already sorted oldest→newest
 * @returns object where keys are dates and values are sender maps
 * @example
 * const grouped = groupMessages(sortedMessages);
 * // grouped['2025-05-22'].senders['sender-123'].messages
 */
function groupMessages(sorted: ChatMessage[]): Record<string, GroupedMessages> {
  return sorted.reduce((acc, message) => {
    const dateKey = getISODateKey(message.created_at)

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        senders: {},
      }
    }

    const senderKey = message.sender_id._id

    const senderData = {
      _id: message.sender_id._id,
      first_name: message.sender_id.first_name,
      last_name: message.sender_id.last_name,
    }

    if (!acc[dateKey].senders[senderKey]) {
      acc[dateKey].senders[senderKey] = {
        sender_id: senderData,
        messages: [],
      }
    }

    acc[dateKey].senders[senderKey].messages.push(message)
    return acc
  }, {} as Record<string, GroupedMessages>)
}

/**
 * Turn the grouped map into an array for rendering.
 *
 * @param grouped - date→sender message map
 * @returns array of { date, senders: [...] }
 */
function transformToArray(grouped: Record<string, GroupedMessages>) {
  return Object.values(grouped).map(group => ({
    date: group.date,
    senders: Object.values(group.senders),
  }))
}

const { data } = await useAsyncData(`channel:${route.params.chat}`, () =>
  $fetch<ChatMessage[]>(`/api/chats/${route.params.chat}/messages`, { method: 'GET', headers }), {
  /**
   * Fetches raw messages then sorts & groups them for the UI.
   *
   * @param msgs - flat array from the API
   * @returns structured array by date and sender
   */
  transform: (msgs) => {
    const sorted = sortMessagesByDate(msgs)
    const grouped = groupMessages(sorted)
    return transformToArray(grouped)
  },
})

const el = ref()
useInfiniteScroll(
  el,
  () => {
    console.log('Load more content...')
  },
  {
    direction: 'top',
    distance: 100,
    canLoadMore: () => {
      return true
    },
  },
)
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <WindowHeader />

    <WindowMain :id="`channel-${route.params.chat}-window`" ref="el">
      <template v-for="(group, i) in data" :key="i">
        <div class="flex justify-center">
          <BaseFont class="text-xs bg-slate-100 px-2 py-1 rounded-full font-medium">
            <NuxtTime :datetime="group.date" />
          </BaseFont>
        </div>

        <WindowMessagesGroup v-for="({ sender_id, messages }, j) in group.senders" :key="j" :messages :sender="sender_id" :is-own="false" />
      </template>
    </WindowMain>

    <WindowFooter />
  </div>

  <WindowPanel>
    <PanelInfo />
  </WindowPanel>
</template>

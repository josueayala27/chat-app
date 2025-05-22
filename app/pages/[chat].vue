<script lang="ts">
import type { Message } from '~/types/message'

interface SenderGroup {
  sender_id: string
  messages: Message[]
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
function sortMessagesByDate(messages: Message[]): Message[] {
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
function groupMessages(sorted: Message[]): Record<string, GroupedMessages> {
  return sorted.reduce((acc, message) => {
    const dateKey = getISODateKey(message.created_at)

    /**
     * Initialize date group if not exists.
     */
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        senders: {},
      }
    }

    const senderKey = message.sender_id

    /**
     * Initialize sender group if not exists.
     */
    if (!acc[dateKey].senders[senderKey]) {
      acc[dateKey].senders[senderKey] = {
        sender_id: senderKey,
        messages: [],
      }
    }

    /**
     * Add message to sender's group.
     */
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
  $fetch<Message[]>(`/api/chats/${route.params.chat}/messages`, {
    method: 'GET',
    headers,
  }), {
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
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    {{ data }}
    <!-- <WindowHeader />

    <WindowMain>
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="false" />
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="false" />
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="true" />
    </WindowMain>

    <WindowFooter /> -->
  </div>

  <WindowPanel>
    <PanelInfo />
  </WindowPanel>
</template>

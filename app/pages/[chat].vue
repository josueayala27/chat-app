<script lang="ts">
import type { ChatMessage } from '~/types/message'
import type { User } from '~/types/user'
import { entries, groupBy, mapValues, pipe, sortBy } from 'remeda'
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

const { data } = await useAsyncData(`channel:${route.params.chat}`, () =>
  $fetch<ChatMessage[]>(`/api/chats/${route.params.chat}/messages`, { method: 'GET', headers }), {
  /**
   * Fetches raw messages then sorts & groups them for the UI.
   *
   * @returns structured array by date and sender
   */
  transform: groupAndTransform,
})

const el = ref()
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <WindowHeader />

    <WindowMain :id="`channel-${route.params.chat}-window`" ref="el">
      <template v-for="(group, i) in data" :key="i">
        <div class="flex justify-center">
          <BaseFont class="text-xs bg-slate-100 px-2 py-1 rounded-full font-medium select-none">
            <NuxtTime :datetime="group.date" />
          </BaseFont>
        </div>

        <WindowMessagesGroup v-for="({ sender_id, messages }, j) in group.senders" :key="j" :messages :sender="sender_id" />
      </template>
    </WindowMain>

    <WindowFooter />
  </div>

  <WindowPanel v-if="true">
    <PanelInfo />
  </WindowPanel>
</template>

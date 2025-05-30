<script lang="ts">
import type { ChatMessage } from '~/types/message'
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

function groupAndTransform(messages: ChatMessage[]) {
  console.log(
    pipe(
      messages,
      sortBy(({ created_at }) => created_at),
      groupBy(({ created_at }) => formatDateLocal(created_at)),
      mapValues(msgs => groupBy(msgs, ({ sender_id }) => sender_id._id)),
      _ => entries(_).map(([date, senders]) => ({
        date,
        senders: entries(senders).map(([id, messages]) => ({
          sender_id: messages[0].sender_id,
          messages,
        })),
      })),
    ),
  )

  return pipe(
    messages,
    _ => sortBy(_, ({ created_at }) => created_at),
    _ => groupBy(_, ({ created_at }) => formatDateLocal(created_at)),
    _ => mapValues(_, msgs => groupBy(msgs, ({ sender_id }) => sender_id._id)),
    _ => entries(_).map(([date, senders]) => ({
      date,
      senders: entries(senders).map(([id, messages]) => ({
        sender_id: messages[0].sender_id,
        messages,
      })),
    })),
  )
}

const { data } = await useAsyncData(`channel-${route.params.chat}`, () =>
  $fetch<ChatMessage[]>(`/api/chats/${route.params.chat}/messages`, { method: 'GET', headers }), {
  /**
   * Fetches raw messages then sorts & groups them for the UI.
   *
   * @returns structured array by date and sender
   */
  transform: groupAndTransform,
})

const el = ref()
// useInfiniteScroll(
//   el,
//   () => {
//     console.log('Load more content...')
//   },
//   {
//     direction: 'top',
//     distance: 100,
//     canLoadMore: () => {
//       return true
//     },
//   },
// )
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <WindowHeader />

    <WindowMain :id="`channel-${route.params.chat}-window`" ref="el">
      <template v-for="(group, i) in data" :key="i">
        <div class="flex justify-center">
          <BaseFont class="text-sm bg-slate-100 px-2 py-1 rounded-full font-medium select-none">
            <NuxtTime :datetime="group.date" />
          </BaseFont>
        </div>

        <WindowMessagesGroup v-for="({ sender_id, messages }, j) in group.senders" :key="j" :messages :sender="sender_id" :is-own="false" />
      </template>
    </WindowMain>

    <WindowFooter />
  </div>

  <WindowPanel v-if="false">
    <PanelInfo />
  </WindowPanel>
</template>

<script setup lang="ts">
import type { Message } from '~/types/message'

useHead({ title: 'Charlie' })

definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)

onUnmounted(() => {
  isSelectMessagesActive.value = false
})

const headers = useRequestHeaders(['cookie'])

const { data } = await useAsyncData(`channel:${route.params.chat}`, () =>
  $fetch<Message[]>(`/api/chats/${route.params.chat}/messages`, {
    method: 'GET',
    headers,
  }), {
  transform: (data) => {
    const sorted = [...data].sort((a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    )

    const grouped = sorted.reduce((acc, message) => {
      const date = new Date(message.created_at).toLocaleDateString('es', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      if (!acc[date])
        acc[date] = []
      acc[date].push(message)
      return acc
    }, {} as Record<string, typeof data>)

    return Object.entries(grouped).map(([date, messages]) => ({ date, messages }))
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

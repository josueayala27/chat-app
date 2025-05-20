<script setup lang="ts">
const headers = useRequestHeaders(['cookie'])
useHead({ title: 'Charlie' })

definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)

onUnmounted(() => {
  isSelectMessagesActive.value = false
})

onMounted(async () => {
  const response = await $fetch('/api/chats', { headers })
  console.log(response)
})
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <WindowHeader />

    <WindowMain>
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="false" />
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="true" />
    </WindowMain>

    <WindowFooter />
  </div>

  <WindowPanel>
    <PanelInfo />
  </WindowPanel>
</template>

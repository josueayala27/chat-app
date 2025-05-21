<script setup lang="ts">
useHead({ title: 'Charlie' })

definePageMeta({ middleware: ['auth'] })

const route = useRoute()
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)

onUnmounted(() => {
  isSelectMessagesActive.value = false
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

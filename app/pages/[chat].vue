<script setup lang="ts">
useHead({ title: 'Charlie' })
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <WindowChatHeader />

    <WindowChatMain>
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="false" />
      <WindowMessagesGroup v-for="item in 1" :key="item" :is-own="true" />
    </WindowChatMain>

    <WindowChatFooter />
  </div>

  <WindowPanel>
    <PanelInfo />
  </WindowPanel>
</template>

<script setup lang="ts">
useHead({ title: ['Charlie', 'Chat App'].join(' • ') })
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <WindowChatHeader />

    <WindowChatMain>
      <ChatMessagesGroup v-for="item in 1" :key="item" :is-own="false" />
      <ChatMessagesGroup v-for="item in 1" :key="item" :is-own="true" />
    </WindowChatMain>

    <WindowChatFooter />
  </div>

  <WindowPanel>
    <PanelInfo />
  </WindowPanel>
</template>

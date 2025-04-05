<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <ChatMessagesLayoutHeader />

    <ChatMessagesLayoutMain>
      <ChatMessagesGroup v-for="item in 8" :key="item" />
    </ChatMessagesLayoutMain>

    <ChatMessagesLayoutFooter />
  </div>

  <ChatInfoAside />
</template>

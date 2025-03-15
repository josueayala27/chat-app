<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <ChatMessagesLayoutHeader />

    <div class="p-2 overflow-auto scrollbar-hidden flex-1">
      <div class="flex flex-col gap-2">
        <ChatMessagesGroup v-for="item in 8" :key="item" />
      </div>
    </div>

    <ChatMessagesLayoutFooter />
  </div>

  <ChatInfoAside />
</template>

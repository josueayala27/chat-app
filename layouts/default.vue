<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <ChatListAside />
    <ChatMessagesContainer>
      <slot />
    </ChatMessagesContainer>

    <ChatInfoAside />
  </div>
</template>

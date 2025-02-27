<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <ChatListContainer />
    <ChatMessagesContainer>
      <slot />
    </ChatMessagesContainer>
    <ChatInfoContainer />
  </div>
</template>

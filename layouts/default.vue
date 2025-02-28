<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <ChatListAside />
    <div class="flex-1 flex divide-x divide-slate-200">
      <slot />
    </div>
  </div>
</template>

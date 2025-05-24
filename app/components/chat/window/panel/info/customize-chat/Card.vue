<script setup lang="ts">
import type { ChatInfoCustomizeChatTheme } from '../CustomizeChat.vue'

defineProps<ChatInfoCustomizeChatTheme>()
</script>

<template>
  <div
    :style="{ '--bg-theme': `var(${color})` }"
    class="aspect-video h-28 flex flex-col divide-y divide-slate-300 border border-slate-300 rounded-lg cursor-pointer"
  >
    <div class="flex-1 p-2 flex flex-col overflow-hidden gap-2">
      <div
        v-for="_class in ['flex-row', 'flex-row-reverse', 'flex-row']"
        :key="_class"
        :class="_class"
        class="flex items-center gap-2"
      >
        <BaseAvatar size="24" />
        <div :class="_class !== 'flex-row' ? 'bg-slate-200' : 'bg-(--bg-theme)'" class="h-6 w-full rounded-full" />
      </div>
    </div>
    <div class="p-1">
      <BaseFont class="text-sm" :content="theme" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ChatInfoCustomizeChatTheme { color: string, theme: string };

const themes = ref<ChatInfoCustomizeChatTheme[]>([
  { color: '--color-sky-400', theme: 'Avacado Alien' },
  { color: '--color-rose-400', theme: 'Rainbow Candy' },
  { color: '--color-emerald-400', theme: 'Honedeydew Punch' },
])
</script>

<template>
  <ChatInfoSectionItem title="Theme" />
  <div class="flex items-center gap-2 overflow-auto px-2 scrollbar-hidden">
    <ChatInfoCustomizeChatCard v-for="({ color, theme }, index) in themes" :key="index" :theme :color />
  </div>
</template>

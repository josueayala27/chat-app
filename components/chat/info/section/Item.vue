<script lang="ts">
interface ChatInfoSectionProps { title: string }
</script>

<script setup lang="ts">
defineProps<ChatInfoSectionProps>()
</script>

<template>
  <div class="flex justify-between items-center p-2">
    <BaseFont class="text-sm text-slate-700" :content="title" />

    <!-- Action -->
    <slot />
  </div>
</template>

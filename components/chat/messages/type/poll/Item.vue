<script lang="ts">
export interface PollItemProps {
  content: string
  ui?: Partial<{ radio: string, bar: string }>
}
</script>

<script setup lang="ts">
defineProps<PollItemProps>()
</script>

<template>
  <div class="flex flex-col gap-2 cursor-pointer">
    <div class="flex items-center gap-2">
      <div :class="ui?.radio" />
      <BaseFont class="text-sm text-inherit" :content />
    </div>

    <div :class="ui?.bar" />
  </div>
</template>

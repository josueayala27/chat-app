<script setup lang="ts">
defineProps<{ ui: Partial<{ radio: string, bar: string }> }>()
</script>

<template>
  <div class="flex flex-col gap-2 cursor-pointer">
    <div class="flex items-center gap-2">
      <div :class="ui.radio" />
      <BaseFont class="text-sm text-inherit" content="This is a poll option" />
    </div>

    <div :class="ui.bar" />
  </div>
</template>

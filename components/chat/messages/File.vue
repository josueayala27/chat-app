<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const ui = tv({
  slots: {
    root: 'py-2 px-3 rounded-lg flex items-center gap-2 cursor-pointer max-w-[15rem] duration-200',
    meta: 'text-xs',
  },
})

const { root, meta } = ui()
</script>

<template>
  <!-- rounded-r-lg last:rounded-bl-lg -->
  <div :class="root()">
    <Icon class="shrink-0" size="24px" name="carbon:document-download" />
    <div class="flex flex-col">
      <BaseFont class="text-sm text-inherit font-medium" content="Screenshot 2025-03-06 at 9.38.23 AM" />
      <BaseFont :class="meta()" content="JPEG - 93 kB" />
    </div>
  </div>
</template>

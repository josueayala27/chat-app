<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: {
    root: 'py-2 px-3 rounded-lg flex items-center gap-2 cursor-pointer max-w-[15rem] duration-200',
    meta: 'text-xs',
  },
  variants: {
    isOwn: {
      true: { root: 'bg-sky-500 text-white', meta: 'text-white/90' },
      false: { root: 'bg-slate-100 hover:bg-slate-200/70', meta: 'text-slate-700' },
    },
  },
})

const { root, meta } = ui({ isOwn })
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

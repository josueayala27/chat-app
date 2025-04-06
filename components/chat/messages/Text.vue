<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: { root: '' },
  variants: {
    isOwn: {
      true: { root: 'bg-sky-500 text-white' },
      false: { root: 'bg-slate-100' },
    },
  },
})

const { root } = ui({ isOwn })
</script>

<template>
  <!-- rounded-r-lg last:rounded-bl-lg -->
  <div :class="root()" class="p-2 rounded-lg">
    <BaseFont class="text-sm text-inherit" content="Hello there!" />
  </div>
</template>

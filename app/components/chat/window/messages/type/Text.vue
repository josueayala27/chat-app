<script lang="ts">
import { tv } from 'tailwind-variants'

interface WindowMessagesTypeTextProps {
  content: string
}
</script>

<script lang="ts" setup>
defineProps<WindowMessagesTypeTextProps>()

const ui = tv({ slots: { root: 'h-9 px-3 max-w-[32rem] flex items-center' } })

const { root } = ui()
</script>

<template>
  <!-- rounded-r-lg last:rounded-bl-lg -->
  <div :class="root()">
    <BaseFont class="text-sm text-inherit" :content />
  </div>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants'

interface WindowMessagesTypeTextProps {
  content: string
}
</script>

<script lang="ts" setup>
defineProps<WindowMessagesTypeTextProps>()

const ui = tv({ slots: { root: 'py-2 px-3 max-w-[32rem] text-sm [&>ul]:list-inside [&>ol]:list-inside [&>ul]:list-disc [&>ol]:list-decimal overflow-hidden' } })

const { root } = ui()
</script>

<template>
  <div :class="root()">
    <BaseFont :content />
  </div>
</template>

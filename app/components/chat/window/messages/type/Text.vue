<script lang="ts">
import { tv } from 'tailwind-variants'

interface WindowMessagesTypeTextProps {
  content: string
}
</script>

<script lang="ts" setup>
defineProps<WindowMessagesTypeTextProps>()

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: {
    root: 'max-w-[32rem] rounded-lg overflow-hidden py-2 px-3 text-sm [&>ul]:list-inside [&>ol]:list-inside [&>ul]:list-disc [&>ol]:list-decimal overflow-hidden',
  },
  variants: {
    isOwn: {
      true: {
        root: 'bg-sky-500 text-white',
      },
      false: {
        root: 'bg-slate-100',
      },
    },
  },
})

const { root } = ui({ isOwn })
</script>

<template>
  <div :class="root()">
    {{ content }}
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ isOwn: boolean }>()

const ui = tv({
  slots: { root: 'flex gap-2', flex: 'flex flex-col' },
  variants: {
    isOwn: {
      true: { root: 'flex-row-reverse', flex: 'items-end' },
      false: { root: 'flex-row', flex: 'items-start' },
    },
  },
})

const { root, flex } = ui({ isOwn: props.isOwn })
provide('isOwn', props.isOwn)
</script>

<template>
  <div :class="root()">
    <BaseAvatar />

    <div :class="flex({ class: 'gap-1' })">
      <BaseFont class="text-sm text-slate-900 font-medium" :content="isOwn ? 'Tú' : 'Josué Ayala'" />

      <div :class="flex({ class: 'gap-0.5' })">
        <template v-for="(_item, i) in ['text', 'text', 'file', 'poll']" :key="i">
          <ChatMessagesText v-if="_item.includes('text')" />
          <ChatMessagesFile v-if="_item.includes('file')" />
          <ChatMessagesPoll v-if="_item.includes('poll')" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ isOwn: boolean }>()

const ui = tv({
  slots: { root: 'flex gap-2', content: 'flex flex-col' },
  variants: {
    isOwn: {
      true: { root: 'flex-row-reverse', content: 'items-end' },
      false: { root: 'flex-row', content: 'items-start' },
    },
  },
})

const { root, content } = ui({ isOwn: props.isOwn })
</script>

<template>
  <div :class="root()">
    <BaseAvatar />

    <div :class="content({ class: 'gap-1' })">
      <BaseFont
        class="text-sm text-slate-900 font-medium"
        :content="isOwn ? 'Tú' : 'Josué Ayala'"
      />

      <div :class="content({ class: 'gap-0.5' })">
        <template v-for="(_item, i) in ['text', 'text', 'media', 'text']" :key="i">
          <ChatMessagesText v-if="_item.includes('text')" :is-own="isOwn" />
          <ChatMessagesMedia v-if="_item.includes('media')" :is-own="isOwn" />
        </template>
      </div>
    </div>
  </div>
</template>

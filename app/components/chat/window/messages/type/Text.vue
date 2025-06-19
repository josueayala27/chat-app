<script lang="ts">
import MarkdownIt from 'markdown-it'
import { tv } from 'tailwind-variants'

interface WindowMessagesTypeTextProps {
  content: string
}
</script>

<script lang="ts" setup>
defineProps<WindowMessagesTypeTextProps>()

const ui = tv({ slots: { root: 'py-2 px-3 max-w-[32rem] text-sm' } })

const { root } = ui()

const md = new MarkdownIt({
  // html: false,
  // linkify: false,
  // typographer: false,
  breaks: true,
}).enable('heading')

// .disable(['image', 'link', 'blockquote', 'list', 'heading', 'table'])

const html = md.render(
  `- hola
  
1. Hola
3. Hello`,
)
</script>

<template>
  <!-- rounded-r-lg last:rounded-bl-lg -->
  <div :class="root()" v-html="html" />
</template>

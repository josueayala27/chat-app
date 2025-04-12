<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import { resolveComponent } from 'vue'

const props = defineProps<{ isOwn: boolean }>()

const messageComponents = [
  { type: 'text', component: resolveComponent('ChatMessagesText') },
  { type: 'audio', component: resolveComponent('ChatMessagesAudio') },
  { type: 'file', component: resolveComponent('ChatMessagesFile') },
  { type: 'poll', component: resolveComponent('ChatMessagesPoll') },
]

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
        <template v-for="(msg, i) in messageComponents" :key="i">
          <ChatMessagesRoot>
            <component :is="msg.component" />
          </ChatMessagesRoot>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Component } from 'vue'
import { WindowMessagesTypeAudio, WindowMessagesTypeFile, WindowMessagesTypePoll, WindowMessagesTypeText } from '#components'
import { tv } from 'tailwind-variants'

export interface Message { type: string, component: Component }
</script>

<script lang="ts" setup>
const props = defineProps<{ isOwn: boolean }>()

const messageComponents: Message[] = [
  { type: 'text', component: WindowMessagesTypeText },
  { type: 'audio', component: WindowMessagesTypeAudio },
  { type: 'file', component: WindowMessagesTypeFile },
  { type: 'poll', component: WindowMessagesTypePoll },
]

const ui = tv({
  slots: {
    root: 'flex relative max-w-[950px] mx-auto w-full',
    avatar: 'absolute z-40 top-0 pointer-events-none',
    title: 'text-sm text-slate-900 font-medium',
    content: 'flex flex-col gap-1 flex-1',
  },
  variants: {
    isOwn: {
      true: {
        content: 'items-end',
        avatar: 'right-0',
        title: 'pr-[calc(48px+8px)]',
      },
      false: {
        content: 'items-start',
        avatar: 'left-0',
        title: 'pl-[calc(48px+8px)]',
      },
    },
  },
})

const { root, content, avatar, title } = ui({ isOwn: props.isOwn })
provide('isOwn', props.isOwn)
</script>

<template>
  <div :class="[root()]">
    <BaseAvatar :ui="{ base: avatar() }" />

    <div :class="content()">
      <BaseFont :class="[title()]" :content="isOwn ? 'Tú' : 'Josué Ayala'" />

      <div class="flex flex-col gap-0.5 w-full">
        <template v-for="(msg, i) in messageComponents" :key="i">
          <WindowMessagesRoot>
            <component :is="msg.component" />
          </WindowMessagesRoot>
        </template>
      </div>
    </div>
  </div>
</template>

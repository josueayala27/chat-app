<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import { resolveComponent } from 'vue'

const props = defineProps<{ isOwn: boolean }>()

const messageComponents = [
  { type: 'text', component: resolveComponent('WindowMessagesTypeText') },
  { type: 'audio', component: resolveComponent('WindowMessagesTypeAudio') },
  { type: 'file', component: resolveComponent('WindowMessagesTypeFile') },
  { type: 'poll', component: resolveComponent('WindowMessagesTypePoll') },
]

const ui = tv({
  slots: {
    root: 'flex relative',
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

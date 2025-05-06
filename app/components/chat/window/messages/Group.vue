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
    flex: 'flex flex-col',
    avatar: 'absolute z-40 top-0',
    title: 'text-sm text-slate-900 font-medium',
  },
  variants: {
    isOwn: {
      true: {
        root: 'flex-row-reverse',
        flex: 'items-end',
        avatar: 'right-0',
        title: 'pr-[calc(48px+8px)]',
      },
      false: {
        root: 'flex-row',
        flex: 'items-start',
        avatar: 'left-0',
        title: 'pl-[calc(48px+8px)]',
      },
    },
  },
})

const { root, flex, avatar, title } = ui({ isOwn: props.isOwn })
provide('isOwn', props.isOwn)
</script>

<template>
  <div :class="[root()]">
    <BaseAvatar :ui="{ base: avatar() }" />

    <div :class="flex({ class: 'gap-1 flex-1' })">
      <BaseFont :class="title()" :content="isOwn ? 'Tú' : 'Josué Ayala'" />

      <div :class="flex({ class: 'gap-0.5 bg-orange-400 w-full' })">
        <template v-for="(msg, i) in messageComponents" :key="i">
          <WindowMessagesRoot>
            <component :is="msg.component" />
          </WindowMessagesRoot>
        </template>
      </div>
    </div>
  </div>
</template>

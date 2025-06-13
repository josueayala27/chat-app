<script lang="ts">
import type { Component } from 'vue'
import type { ChatMessage } from '~/types/message'
import type { User } from '~/types/user'
import { tv } from 'tailwind-variants'

export interface Message { type: string, component: Component }
</script>

<script lang="ts" setup>
const props = defineProps<{
  sender: Pick<User, '_id' | 'first_name' | 'last_name'>
  messages: ChatMessage[]
}>()

const ui = tv({
  slots: {
    root: 'flex relative w-full',
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

const { user } = useAuth()

const isOwn = ref<boolean>(props.sender._id === user.value._id)

const { root, content, avatar, title } = ui({ isOwn: isOwn.value })

provide('isOwn', isOwn.value)
</script>

<template>
  <div :class="[root()]">
    <BaseAvatar :ui="{ base: avatar() }" />

    <div :class="content()">
      <BaseFont :class="[title()]" :content="isOwn ? 'Tú' : `${sender.first_name} ${sender.last_name}`" />

      <div class="flex flex-col gap-0.5 w-full">
        <template v-for="(msg, i) in messages" :key="i">
          <WindowMessagesRoot>
            <WindowMessagesTypeText>
              {{ msg.content }}
            </WindowMessagesTypeText>
          </WindowMessagesRoot>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ChatMessage } from '~/types/message'

interface WindowMessagesTypeTextProps extends ChatMessage {}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()
</script>

<template>
  <div class="flex flex-col items-end">
    <div class="h-[20rem] w-[20rem] rounded-t-lg bg-slate-100" />

    <WindowMessagesTypeText v-bind="props" :ui="{ root: 'rounded-t-none w-full' }" content="24. Look my photos haha 😂" />
  </div>
</template>

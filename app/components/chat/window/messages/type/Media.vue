<script lang="ts">
import type { ChatMessage } from '~/types/message'

interface WindowMessagesTypeTextProps extends ChatMessage {}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()

const url = ref<string>('')

const MAX_WIDTH = 480
// const MAX_HEIGHT = 432

const height = ref<number>(0)

async function fetchImage(): Promise<void> {
  const response = await $fetch('https://images.unsplash.com/photo-1748164685747-0e5107e84cf7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', {
    responseType: 'blob',
  })

  const bitmap = await createImageBitmap(response as Blob)

  const scale = MAX_WIDTH / bitmap.width
  height.value = Math.round(bitmap.height * scale)

  url.value = URL.createObjectURL(response as Blob)
}

fetchImage()
</script>

<template>
  <div class="flex flex-col items-end">
    <div :style="{ height: `${height}px`, width: `${MAX_WIDTH}px` }" class="rounded-t-lg bg-red-500 flex items-center justify-center overflow-hidden cursor-pointer">
      <img class="w-full h-full object-contain" :src="url">
    </div>

    <WindowMessagesTypeText v-bind="props" :ui="{ root: 'rounded-t-none w-full' }" />
  </div>
</template>

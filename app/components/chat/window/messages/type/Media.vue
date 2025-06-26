<script lang="ts">
import type { ChatMessage } from '~/types/message'

interface WindowMessagesTypeTextProps extends ChatMessage {}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()

const MAX_WIDTH = 480
// const MAX_HEIGHT = 432

const height = ref<number>(400)

// const scale = MAX_WIDTH / bitmap.width
// height.value = Math.round(bitmap.height * scale)

// fetchImage()
</script>

<template>
  <div class="flex flex-col items-end">
    <div
      :style="{ height: `${height}px`, width: `${MAX_WIDTH}px` }"
      class="rounded-t-lg flex items-center justify-center overflow-hidden cursor-pointer relative"
    >
      <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <div class="bg-white backdrop-blur-md flex items-center justify-center rounded-full size-13.5">
          <Icon class="text-slate-700" size="20px" name="svg-spinners:3-dots-fade" />
          <!-- <Icon class="text-slate-700" size="54px" name="svg-spinners:180-ring" /> -->
        </div>
      </div>

      <img src="https://cdn.parly.chat/fit-in/400x400/messages/media/matt-hardy-6ArTTluciuA-unsplash.jpg">
      <img src="https://cdn.parly.chat/messages/media/matt-hardy-6ArTTluciuA-unsplash.jpg">
    </div>

    <WindowMessagesTypeText v-bind="props" :ui="{ root: 'rounded-t-none w-full' }" />
  </div>
</template>

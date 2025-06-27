<script lang="ts">
import type { ChatMessage } from '~/types/message'

interface WindowMessagesTypeTextProps extends ChatMessage {}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()
const config = useRuntimeConfig()
const MAX_WIDTH = 480
// const MAX_HEIGHT = 432

const height = ref<number>(400)

// const scale = MAX_WIDTH / bitmap.width
// height.value = Math.round(bitmap.height * scale)

const json = {
  bucket: config.public.AWS_BUCKET,
  key: 'zhenyu-luo-n4XeCKwwrk0-unsplash.jpg',
  edits: {
    resize: {
      width: MAX_WIDTH * 2,
      height: 800,
      fit: 'cover',
    },
    // blur: 100,
  },
}

const url = btoa(JSON.stringify(json))
</script>

<template>
  <div class="flex flex-col items-end">
    <div
      :style="{ height: `${height}px`, width: `${MAX_WIDTH}px` }"
      class="rounded-t-lg flex items-center justify-center overflow-hidden cursor-pointer relative"
    >
      <!-- <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <div class="bg-white backdrop-blur-md flex items-center justify-center rounded-full size-13.5">
          <Icon class="text-slate-700" size="20px" name="svg-spinners:3-dots-fade" />
        </div>
      </div> -->

      <img :src="`https://cdn.parly.chat/${url}`" class="object-cover w-full h-full">
    </div>

    <WindowMessagesTypeText v-bind="props" :ui="{ root: 'rounded-t-none w-full' }" />
  </div>
</template>

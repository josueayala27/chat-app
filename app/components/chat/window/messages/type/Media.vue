<script lang="ts">
import type { ChatMessage } from '~/types/message'

interface WindowMessagesTypeTextProps extends ChatMessage {}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()
// const config = useRuntimeConfig()
const MAX_WIDTH = 480
// const MAX_HEIGHT = 432

const height = ref<number>(400)

// const scale = MAX_WIDTH / bitmap.width
// height.value = Math.round(bitmap.height * scale)

// const json = {
//   bucket: config.public.AWS_BUCKET,
//   key: 'zhenyu-luo-n4XeCKwwrk0-unsplash.jpg',
//   edits: {
//     resize: {
//       width: MAX_WIDTH * 2,
//       height: 800,
//       fit: 'cover',
//     },
//     // blur: 100,
//   },
// }

// const url = btoa(JSON.stringify(json))

const images = computed(() => {
  return props.attachments?.filter(el => ['image/jpeg'].includes(el.content_type))
})
</script>

<template>
  <div class="flex flex-col items-end gap-1">
    <!-- <div
      :style="{ height: `${height}px`, width: `${MAX_WIDTH}px` }"
      class="rounded-t-lg flex items-center justify-center overflow-hidden cursor-pointer relative"
    >
      <img :src="`https://cdn.parly.chat/${url}`" class="object-cover w-full h-full">
    </div> -->

    <div class="grid grid-cols-2 gap-1 cursor-pointer">
      <div v-for="(image, index) in images" :key="index" class="size-32 bg-slate-200 rounded-lg overflow-hidden">
        <img :src="buildURL(image.key, 128 * 3, 128 * 3)">
      </div>
    </div>

    <WindowMessagesTypeText v-bind="props" />
  </div>
</template>

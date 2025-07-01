<script lang="ts">
import type { Attachment } from '~/types/attachment'
import type { ChatMessage } from '~/types/message'

interface WindowMessagesTypeTextProps extends Omit<ChatMessage, 'attachments'> {
  attachments: Attachment[]
}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()
// const MAX_WIDTH = 480
// const MAX_HEIGHT = 432

// const scale = MAX_WIDTH / bitmap.width
// const height = Math.round(bitmap.height * scale)

const images = computed(() => {
  return props.attachments.filter(el => ['image/jpeg'].includes(el.content_type)).slice(0, 5)
})
</script>

<template>
  <div class="flex flex-col items-end gap-1">
    <div :style="{ '--grid-cols': Math.min(images.length, 3) }" class="grid grid-cols-[repeat(var(--grid-cols),_minmax(0,_1fr))] gap-1 cursor-pointer">
      <div v-for="(image, index) in images" :key="index" class="size-32 bg-slate-200 rounded-lg overflow-hidden">
        <img :src="buildURL(image.key, 128 * 3, 128 * 3)">
      </div>
    </div>

    <WindowMessagesTypeText v-bind="props" />
  </div>
</template>

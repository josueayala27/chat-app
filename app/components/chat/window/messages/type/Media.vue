<script lang="ts">
import type { Attachment } from '~/types/attachment'
import type { ChatMessage } from '~/types/message'
import mime from 'mime-types'

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

/**
 * Imágenes adjuntas filtradas.
 * @type {ComputedRef<Attachment[]>}
 */
const images: ComputedRef<Attachment[]> = computed(() => {
  return props.attachments.filter(el => el.content_type.startsWith('image/'))
})

/**
 * Archivos adjuntos no-imagen filtrados.
 * @type {ComputedRef<Attachment[]>}
 */
const files: ComputedRef<Attachment[]> = computed(() => {
  return props.attachments.filter(el => !el.content_type.startsWith('image/'))
})
</script>

<template>
  <div class="flex flex-col items-end gap-1 mt-0.5">
    <div
      style="direction: rtl"
      :style="{ '--grid-cols': Math.min(images.length, 3) }"
      class="grid grid-cols-[repeat(var(--grid-cols),_minmax(0,_1fr))] gap-1 cursor-pointer"
    >
      <div v-for="(image, index) in images" :key="index" style="direction: rtl;" class="size-32 bg-slate-200 rounded-lg overflow-hidden relative">
        <div v-if="index === 3" style="direction: rtl" class="absolute top-0 left-0 grid place-items-center w-full h-full text-white bg-black/30 font-medium text-sm">
          8+
        </div>
        <img
          :src="buildURL(image.key, {
            resize: {
              width: 128 * 3,
              height: 128 * 3,
            },
            blur: index === 3 ? 10 : 0,
          })"
        >
      </div>
    </div>

    <!-- TODO: Use `_id` as key -->
    <div
      v-for="(file, index) in files" :key="index"
      class="h-21 bg-slate-100 grid place-items-center rounded-lg cursor-pointer hover:bg-slate-200/60 shrink-0 relative overflow-hidden group"
    >
      <div class="flex items-center py-2 pl-2 pr-4 w-full h-full gap-2">
        <div
          :class="[
            String(mime.extension(file.content_type)) === 'pdf' ? 'bg-red-400' : 'bg-blue-400',
          ]"
          class="h-full aspect-square grid place-items-center rounded-lg text-white"
        >
          <Icon size="24px" :name="String(mime.extension(file.content_type)) === 'pdf' ? 'carbon:document-pdf' : 'carbon:document'" class="shrink-0" />
        </div>
        <div class="flex flex-col break-all text-slate-400 text-sm">
          <BaseFont class="line-clamp-1 font-semibold text-slate-900" :content="file.file_name.split('.')[0]" />
          <BaseFont class="line-clamp-1" :content="String(mime.extension(file.content_type)) === 'pdf' ? 'PDF' : 'File'" />
        </div>
      </div>
    </div>

    <WindowMessagesTypeText v-bind="props" />
  </div>
</template>

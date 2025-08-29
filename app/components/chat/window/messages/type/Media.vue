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
// Display box constraints for a single image (max bounds)
const SINGLE_MAX_WIDTH = 480
const SINGLE_MAX_HEIGHT = 432
const SINGLE_DPR = 3

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

/**
 * Derive optimal CloudFront resize params for a single image preview.
 * - Use width-only for landscape to preserve aspect ratio
 * - Use height-only for portrait to preserve aspect ratio
 * - Multiply by 3 for HiDPI sharpness
 */
const singleImage = computed(() => images.value[0])
// Compute display size that fits within max bounds without cropping
const singleBox = computed(() => {
  const meta = singleImage.value?.meta as any
  if (meta?.width && meta?.height) {
    const scale = Math.min(SINGLE_MAX_WIDTH / meta.width, SINGLE_MAX_HEIGHT / meta.height, 1)
    return { w: Math.round(meta.width * scale), h: Math.round(meta.height * scale) }
  }
  return { w: SINGLE_MAX_WIDTH, h: SINGLE_MAX_HEIGHT }
})

// Request image at HiDPI size (width- or height-constrained to preserve aspect)
const singleResizeParams = computed(() => {
  const meta = singleImage.value?.meta as any
  if (meta?.width && meta?.height) {
    const widthLimited = SINGLE_MAX_WIDTH / meta.width <= SINGLE_MAX_HEIGHT / meta.height
    return widthLimited
      ? { resize: { width: singleBox.value.w * SINGLE_DPR } }
      : { resize: { height: singleBox.value.h * SINGLE_DPR } }
  }
  return { resize: { width: SINGLE_MAX_WIDTH * SINGLE_DPR } }
})

const singleImageSrc = computed(() => {
  const img = singleImage.value
  if (!img) return ''
  return buildURL(img.key, singleResizeParams.value)
})
</script>

<template>
  <div class="flex flex-col items-end gap-1 mt-0.5">
    <!-- Single image: show larger preview preserving aspect ratio -->
    <template v-if="images.length === 1">
      <img
        :src="singleImageSrc"
        :width="singleBox.w"
        :height="singleBox.h"
        class="block rounded-lg"
        loading="lazy"
      >
    </template>

    <!-- Multiple images grid -->
    <div v-else
      style="direction: rtl"
      :style="{ '--grid-cols': Math.min(images.length, 3) }"
      class="grid grid-cols-[repeat(var(--grid-cols),_minmax(0,_1fr))] gap-1 cursor-pointer"
    >
      <div v-for="(image, index) in images.slice(0, 6)" :key="image._id" style="direction: rtl;" class="size-32 bg-slate-200 rounded-lg overflow-hidden relative ring ring-slate-200">
        <div
          v-if="index === 3"
          style="direction: ltr"
          class="absolute top-0 left-0 grid place-items-center w-full h-full text-white bg-black/30 font-medium text-sm select-none"
        >
          <template v-if="images.length > 5">
            +{{ images.length - 5 }}
          </template>
        </div>
        <img
          loading="lazy"
          :src="buildURL(image.key, {
            resize: {
              width: 128 * 3,
              height: 128 * 3,
            },
            ...(index === 3 && images.length >= 6 ? { blur: 15 } : {}),
          })"
          class="w-full h-full object-cover"
        >
      </div>
    </div>

    <div
      v-for="file in files" :key="file._id"
      class="h-21 bg-slate-100 grid place-items-center rounded-lg cursor-pointer hover:bg-slate-200/60 shrink-0 relative overflow-hidden group"
    >
      <div class="flex items-center py-2 pl-2 pr-4 w-full h-full gap-2">
        <div
          :class="[String(mime.extension(file.content_type)) === 'pdf' ? 'bg-red-400' : 'bg-blue-400']"
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

    <WindowMessagesTypeText v-if="props.content" v-bind="props" />
  </div>
</template>

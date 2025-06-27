<script lang="ts" setup>
import type { RealtimeChannel } from 'ably'
import type { WindowMainInstance } from '~/pages/[chat].vue'
import type { ChatMessage } from '~/types/message'
import pLimit from 'p-limit'

const MAX_PARALLEL_UPLOADS = 3

const limit = pLimit(MAX_PARALLEL_UPLOADS)

const { $ably } = useNuxtApp()
const route = useRoute('chat')

const { user } = useAuth()
const { reference, closePopover } = usePopover()
const { create: createAttachment } = useAttachment(route.params.chat)
const { values, validate, resetForm } = useForm<{ content: string }>({ name: 'chat-footer' })
const { createTempMessage, updateTempMessage } = useChat()
const config = useRuntimeConfig()

const _window = inject<Ref<WindowMainInstance | undefined>>('window')

/**
 * A reactive reference to a Promise used to queue asynchronous tasks.
 * Ensures that tasks are executed sequentially.
 * @type {import('vue').Ref<Promise<void>>}
 */
const taskQueue: Ref<Promise<void>> = ref<Promise<void>>(Promise.resolve())

/**
 * Enqueues an asynchronous task to be executed after the current queue.
 * @param {() => Promise<void>} task - The asynchronous function to enqueue.
 */
function enqueueTask(task: () => Promise<void>) {
  taskQueue.value = taskQueue.value.then(() => task())
}

/**
 * Validates the form and, if valid, enqueues a task to send the message.
 * Sends a POST request to the appropriate chat endpoint with the message content.
 */
async function sendMessage() {
  const { valid } = await validate()

  if (valid) {
    const content = values.content.trim()
    resetForm()

    const { _id } = createTempMessage({ chat_id: route.params.chat, content })

    await nextTick()
    _window?.value?.scrollToBottom(0.3)

    enqueueTask(async () => {
      const message = await $fetch(`/api/chats/${route.params.chat}/messages`, {
        method: 'POST',
        body: {
          type: 'text',
          content,
        },
      })

      updateTempMessage(_id, message as ChatMessage)
    })
  }
}

const channel: Ref<RealtimeChannel | undefined> = ref<RealtimeChannel>()
onMounted(() => {
/**
 * Retrieves the Ably channel corresponding to the chat item.
 * @type {RealtimeChannel}
 */
  channel.value = $ably.channels.get(`channel:${route.params.chat}`)
})

/**
 * Reactive ref tracking whether the current user is typing.
 * @type {Ref<boolean>}
 */
const isTyping: Ref<boolean> = ref<boolean>(false)

/**
 * Publish a typing event to the channel.
 * @param {string} event - Either 'event:start-typing' or 'event:stop-typing'.
 * @param {boolean} _isTyping - The current typing status.
 */
function typing(event: string, _isTyping: boolean) {
  channel.value?.publish(event, { user_id: user.value._id, is_typing: _isTyping })
}

/**
 * Debounced function that stops typing after a delay (1s).
 * Sets `isTyping` to false and publishes the stop-typing event.
 * @see useDebounceFn
 */
const debouncedFn = useDebounceFn(() => {
  isTyping.value = false
  typing('event:stop-typing', isTyping.value)
}, 1500)

/**
 * Handle input events:
 * - On first keystroke, mark typing as true and publish start-typing.
 * - Then reset the stop-typing timer on each input.
 */
function onInput() {
  if (!isTyping.value) {
    isTyping.value = true
    typing('event:start-typing', isTyping.value)
  }
  debouncedFn()
}

const media = ref<HTMLInputElement>()
const files = ref<{ file: File, status: 'idle' | 'uploading' | 'done' | 'error', source: string, type: string }[]>([])

function setStatus(file: File, status: 'idle' | 'uploading' | 'done' | 'error') {
  const item = files.value.find(f => f.file === file)

  if (item)
    item.status = status
}

function setSource(file: File, source: string) {
  const item = files.value.find(f => f.file === file)

  if (item)
    item.source = source
}

/**
 * Creates a square thumbnail (default 252 × 252 px) from an image file.
 *
 * The image is center-cropped so that the shorter edge defines the square,
 * then scaled down to the requested side length and encoded as JPEG.
 *
 * @param file - The original image file.
 * @param side - The side length of the square in pixels. Defaults to 84 × 3 = 252 px.
 * @param quality  JPEG quality between 0 and 1. Defaults to 0.7 (≈70 %).
 * @returns A promise that resolves to either an object-URL (modern browsers with `OffscreenCanvas.convertToBlob`) or a data-URL fallback.
 *
 * @example
 * ```ts
 * const thumbUrl = await createThumb(file);        // 252 px, 70 % quality
 * const tiny     = await createThumb(file, 96, 0.6); // 96 px, 60 % quality
 * imageElement.src = thumbUrl;                     // Display thumbnail
 * ```
 */
async function createThumb(
  file: File,
  side: number = 84 * 3,
  quality: number = 0.7,
): Promise<string> {
  // 1. Decode the image into a bitmap
  const img = await createImageBitmap(file)

  // 2. Determine the crop box: square centered on the shorter edge
  const crop = Math.min(img.width, img.height)
  const sx = (img.width - crop) / 2 // X offset
  const sy = (img.height - crop) / 2 // Y offset

  // 3. Prepare canvas (OffscreenCanvas where available)
  const Canvas = (globalThis as any).OffscreenCanvas || HTMLCanvasElement
  const canvas: HTMLCanvasElement | OffscreenCanvas = new Canvas(side, side) as any
  const ctx = canvas.getContext('2d')!

  // 4. Draw: source (sx, sy, crop, crop) → destination (0, 0, side, side)
  ctx.drawImage(img, sx, sy, crop, crop, 0, 0, side, side)
  img.close()

  // 5. Export and return URL
  return (canvas as any).convertToBlob
    ? URL.createObjectURL(await (canvas as any).convertToBlob({ type: 'image/jpeg', quality }))
    : (canvas as HTMLCanvasElement).toDataURL('image/jpeg', quality)
}

function buildURL(key: string) {
  const url = {
    bucket: config.public.AWS_BUCKET,
    key,
    edits: {
      resize: {
        width: 84 * 3,
        height: 84 * 3,
      },
    },
  }

  return `https://cdn.parly.chat/${btoa(JSON.stringify(url))}`
}

function preload(src: string) {
  return new Promise<void>((res, rej) => {
    const img = new Image()
    img.onload = () => res()
    img.onerror = rej
    img.src = src
  })
}

async function startUpload(file: File) {
  const { upload_url, key } = await createAttachment(file)

  if (!upload_url) {
    console.error(`🚨 [Uploader] Failed to get upload URL for “${file.name}”`)
  }

  try {
    console.log(`🚀 [Uploader] Starting upload for “${file.name}” — ${Math.round(file.size / 1024)} KB on deck…`)
    setStatus(file, 'uploading')

    await $fetch(upload_url, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    })

    const cdnURL = buildURL(key)
    await preload(cdnURL)

    console.log(`✅ [Uploader] Successfully uploaded “${file.name}”`)
    setSource(file, cdnURL)
    setStatus(file, 'done')
  }
  catch (error) {
    console.error(`🚨 [Uploader] Upload failed for “${file.name}”`, error)
    setStatus(file, 'error')
  }
}

/**
 * Handles file input changes by uploading each selected file in parallel.
 * - Requests an upload URL for each file from the backend.
 * - Uploads each file directly to the provided storage URL using PUT.
 * - Returns an array of uploaded file IDs.
 *
 * @async
 * @function onInputChange
 * @returns {Promise<string[]|undefined>} Array of uploaded file IDs, or undefined if no files.
 */
async function onInputChange(): Promise<void> {
  const _files = media.value?.files
  if (_files) {
    closePopover()

    const uploadPromises: Promise<void>[] = []

    for (const file of _files) {
      files.value.push({
        file,
        status: 'uploading',
        source: await createThumb(file),
        type: file.type,
      })

      uploadPromises.push(limit(() => startUpload(file)))
    }

    await nextTick()
    _window?.value?.scrollToBottom()
  }
}

function onRemove(_index: number) {

}

const _allDone = computed(() => files.value.every(f => f.status === 'done'))
</script>

<template>
  <input ref="media" multiple type="file" class="hidden" @change="onInputChange">

  <div v-if="files && files.length > 0" class="w-full p-3 border-b flex items-center gap-2 overflow-auto scrollbar-hidden">
    <WindowFooterTypeDefaultPreview
      v-for="(file, index) in files" :key="`${file.file.name} ${file.status}`"
      v-memo="[file.status]"
      :status="file.status"
      :source="file.source"
      :type="file.type"
      @remove="onRemove(index)"
    />
  </div>

  <div class="p-2 flex items-center gap-2">
    <BasePopover ref="reference">
      <template #default="{ isOpen }">
        <div :class="[{ 'bg-slate-100': isOpen }]" class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:add-large" :class="[{ 'rotate-135': isOpen }]" class="flex shrink-0 duration-300" />
        </div>
      </template>

      <template #content>
        <BaseMenuContainer
          :items="[
            { icon: 'carbon:document-add', label: 'File' },
            { icon: 'carbon:image-copy', label: 'Photos & videos', onClick: () => media?.click() },
            { icon: 'carbon:text-short-paragraph', label: 'Poll' },
          ]"
        />
      </template>
    </BasePopover>

    <BaseInput
      name="content"
      :ui="{ root: 'w-full' }"
      placeholder="Write something"
      type="text"
      @input="onInput"
      @keydown.enter.prevent="sendMessage"
    />

    <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer" @click="sendMessage">
      <Icon
        size="20px"
        :name="values.content || files?.length ? 'carbon:send-filled' : 'carbon:microphone'"
        :class="{ 'text-sky-500': values.content || files?.length }"
        class="flex shrink-0"
      />
    </div>
  </div>
</template>

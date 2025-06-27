<script lang="ts" setup>
import type { RealtimeChannel } from 'ably'
import type { WindowMainInstance } from '~/pages/[chat].vue'
import type { ChatMessage } from '~/types/message'
// import pLimit from 'p-limit'

// const limit = pLimit(3)

const { $ably } = useNuxtApp()
const route = useRoute('chat')

/**
 * Retrieves the authenticated user information.
 * @type {object}
 * @property {Ref<User>} user - The current authenticated user.
 */
const { user } = useAuth()
const { reference, closePopover } = usePopover()
const { getUploadUrl } = useAttachmentUploader(route.params.chat)
const { values, validate, resetForm } = useForm<{ content: string }>({ name: 'chat-footer' })
const { createTempMessage, updateTempMessage } = useChat()

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
}, 1000)

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

async function createThumb(file: File, size = 84 * 3) {
  const img = await createImageBitmap(file)
  const canvas = Object.assign(document.createElement('canvas'), { width: size, height: size * (img.height / img.width) })
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.7)
}

async function startUpload(file: File) {
  const url = await getUploadUrl(file)

  if (!url) {
    console.error(`🚨 [Uploader] Failed to get upload URL for “${file.name}”`)
  }

  console.log(`🚀 [Uploader] Starting upload for “${file.name}” — ${Math.round(file.size / 1024)} KB on deck…`)
  setStatus(file, 'uploading')

  await $fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })

  console.log(`✅ [Uploader] Successfully uploaded “${file.name}”`)
  setStatus(file, 'done')
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

    for (const file of _files) {
      files.value.push({
        file,
        status: 'uploading',
        source: await createThumb(file),
        type: file.type,
      })

      startUpload(file)
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
    <WindowFooterTypeDefaultPreview v-for="(file, index) in files" :key="index" :status="file.status" :source="file.source" :type="file.type" @remove="onRemove(index)" />
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

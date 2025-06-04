<script lang="ts" setup>
import type { RealtimeChannel } from 'ably'

const { $ably } = useNuxtApp()
const route = useRoute()

/**
 * Retrieves the authenticated user information.
 * @type {object}
 * @property {Ref<User>} user - The current authenticated user.
 */
const { user } = useAuth()

const { values, validate, resetForm } = useForm<{ content: string }>({
  name: 'chat-footer',
})

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

    enqueueTask(async () => {
      await $fetch(`/api/chats/${route.params.chat}/messages`, {
        method: 'POST',
        body: {
          type: 'text',
          content,
        },
      })
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
const files = ref<FileList | null | undefined>()

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
  files.value = media.value?.files

  if (files.value) {
    /**
     * Create an array of upload promises for parallel processing.
     */
    const uploadPromises = Array.from(files.value).map(async (file) => {
      const { name, size, type } = file

      /**
       * Request a presigned upload URL from your backend.
       */
      const { _id, upload_url } = await $fetch<{ _id: string, upload_url: string }>(
        `/api/chats/${route.params.chat}/attachments`,
        {
          method: 'POST',
          body: { filename: name, size, content_type: type },
        },
      )

      /**
       * Upload the file directly to the storage endpoint.
       */
      await $fetch(upload_url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': type },
      })

      /**
       * Return the file ID for further processing if needed.
       */
      return _id
    })

    const ids = await Promise.all(uploadPromises)
    console.log(ids)
  }
}

function fileToURL(file: File) {
  return URL.createObjectURL(file)
}
</script>

<template>
  <input ref="media" multiple type="file" class="hidden" @change="onInputChange">

  <div v-if="files && files.length > 0" class="w-full p-3 border-b flex items-center gap-2 overflow-auto scrollbar-hidden">
    <div
      v-for="(file, index) in files" :key="index"
      class="size-21 bg-slate-100 text-xs text-slate-400 grid place-items-center rounded-lg cursor-pointer hover:bg-slate-200/60 shrink-0 overflow-hidden relative group"
    >
      <template v-if="!['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/x-icon', 'image/tiff', 'image/heic', 'image/avif'].includes(file.type)">
        <div class="flex flex-col items-center gap-1 p-2">
          <icon size="24px" name="carbon:document-blank" />
          <BaseFont class="line-clamp-1 break-all" :content="file.name" />
        </div>
      </template>

      <img v-else class="h-full w-full object-cover" :src="fileToURL(file)">

      <div class="absolute top-0 left-0 bg-slate-900/70 w-full h-full group-hover:visible invisible grid place-items-center">
        <Icon size="24px" class="text-neutral-50" name="carbon:trash-can" />
      </div>
    </div>
  </div>

  <div class="p-2 flex items-center gap-2">
    <BasePopover>
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
        :name="values.content ? 'carbon:send-filled' : 'carbon:microphone'"
        :class="{ 'text-sky-500': values.content }"
        class="flex shrink-0"
      />
    </div>
  </div>
</template>

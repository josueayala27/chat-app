<script lang="ts" setup>
import type { RealtimeChannel } from 'ably'
import type { WindowMainInstance } from '~/pages/[chat].vue'
import pLimit from 'p-limit'

const MAX_PARALLEL_UPLOADS = 3
const limit = pLimit(MAX_PARALLEL_UPLOADS)

const { $ably } = useNuxtApp()
const route = useRoute('chat')

const { user } = useAuth()
const { files } = useFileUploader()
const { reference, closePopover } = usePopover()
const { send: sendMessage } = useMessage(route.params.chat)
const { createAttachment, uploadFile } = useAttachment(route.params.chat)

const _window = inject<Ref<WindowMainInstance | undefined>>('window')

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

const mediaInput = ref<HTMLInputElement>()

async function computeSHA256(file: File): Promise<string> {
  const arrayBuf = await file.arrayBuffer()
  const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuf)
  return [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function onInputChange() {
  const _files = mediaInput.value?.files
  closePopover()
  if (!_files)
    return

  files.value = await Promise.all([..._files].map(async (file: File) => {
    const isImage = file.type.startsWith('image/')
    let src: string | undefined

    if (isImage) {
      src = await createThumb(file)
    }

    return {
      file,
      file_name: file.name,
      status: 'pending',
      src,
    }
  }))

  // Ahora, paraleliza las subidas con límite:
  const uploadTasks = files.value.map(entry =>
    limit(async () => {
      entry.status = 'uploading'
      let meta: any
      if (entry.file.type.startsWith('image/')) {
        meta = await getImageDimensionsFromFile(entry.file)
      }
      try {
        const { upload_url, _id, key } = await createAttachment({
          content_type: entry.file.type,
          file_name: entry.file_name,
          sha256: await computeSHA256(entry.file),
          size: entry.file.size,
          meta,
        })

        if (upload_url) {
          await uploadFile({ upload_url, file: entry.file })
        }

        entry.status = 'done'
        entry._id = _id
        entry.key = key
      }
      catch (_e: any) {
        console.log(_e)
        entry.status = 'error'
      }
    }),
  )

  // Espera a que todas las subidas terminen
  await Promise.all(uploadTasks)
}

computed(() => files.value.every(f => f.status === 'done'))

function send() {
  const attachmentIds = files.value
    .filter(f => f.status === 'done' && f._id)
    .map(f => f._id as string)
  sendMessage(attachmentIds)
}
</script>

<template>
  <input ref="mediaInput" multiple type="file" class="hidden" @change="onInputChange">

  <div v-if="files && files.length > 0" class="w-full p-3 border-b flex items-center gap-2 overflow-auto scrollbar-hidden">
    <!-- <WindowFooterTypeDefaultPreview
      v-for="(file, index) in files"
      :key="file._id"
      :status="file.status"
      :source="file.source || ''"
      :type="file.content_type"
      @remove="onRemove(index)"
    /> -->
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
            { icon: 'carbon:document-blank', label: 'Media & Files', onClick: () => mediaInput?.click() },
            { icon: 'carbon:text-short-paragraph', label: 'Poll' },
          ]"
        />
      </template>
    </BasePopover>

    {{ files }}

    <BaseInput
      name="content"
      :ui="{ root: 'w-full' }"
      placeholder="Write something"
      type="text"
      @input="onInput"
      @keydown.enter.prevent="send()"
    />

    <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer" @click="send()">
      <Icon
        size="20px"
        name="carbon:send-filled"
        class="flex shrink-0 text-sky-500"
      />
    </div>
  </div>
</template>

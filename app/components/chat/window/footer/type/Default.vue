<script lang="ts" setup>
import type { RealtimeChannel } from 'ably'
import type { WindowMainInstance } from '~/pages/[chat].vue'
import pLimit from 'p-limit'

const MAX_PARALLEL_UPLOADS = 3

const limit = pLimit(MAX_PARALLEL_UPLOADS)

const { $ably } = useNuxtApp()
const route = useRoute('chat')

const { user } = useAuth()
const { files, uploadSingleFile } = useFileUploader(route.params.chat)
const { reference, closePopover } = usePopover()
const { send } = useMessage(route.params.chat)

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

const media = ref<HTMLInputElement>()

async function onInputChange() {
  const _files = media.value?.files
  closePopover()

  if (!_files)
    return

  const entries = await Promise.all(
    [..._files].map(async file => ({
      file,
      status: 'idle' as const,
      source: await createThumb(file),
      type: file.type,
      meta: await getImageDimensionsFromFile(file),
    })),
  )

  files.value.push(...entries)

  await Promise.all([..._files].map(file => limit(() => uploadSingleFile(file))))

  await nextTick()
  _window?.value?.scrollToBottom()
}

async function onRemove(index: number) {
  $fetch(`/api/attachments/${files.value[index]?._id}`, { method: 'DELETE' })
}

const _allDone = computed(() => files.value.every(f => f.status === 'done'))
</script>

<template>
  <input ref="media" multiple type="file" class="hidden" @change="onInputChange">

  <div v-if="files && files.length > 0" class="w-full p-3 border-b flex items-center gap-2 overflow-auto scrollbar-hidden">
    <WindowFooterTypeDefaultPreview
      v-for="(file, index) in files"
      :key="file._id"
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
      @keydown.enter.prevent="send"
    />

    <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer" @click="send">
      <!-- <Icon
        size="20px"
        :name="values.content || files?.length ? 'carbon:send-filled' : 'carbon:microphone'"
        :class="{ 'text-sky-500': values.content || files?.length }"
        class="flex shrink-0"
      /> -->
    </div>
  </div>
</template>

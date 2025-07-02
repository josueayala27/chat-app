<script lang="ts" setup>
import type { RealtimeChannel } from 'ably'
import type { WindowMainInstance } from '~/pages/[chat].vue'
import { useFileUploader } from '~/composables/useFileUploader'

const { $ably } = useNuxtApp()
const route = useRoute('chat')

const { user } = useAuth()
const { files, addFiles } = useFileUploader(route.params.chat)
const { reference, closePopover } = usePopover()
const { send: sendMessage } = useMessage(route.params.chat)

/**
 * Injects the main window instance.
 */
const _window = inject<Ref<WindowMainInstance | undefined>>('window')

/**
 * Ably RealtimeChannel for real-time communication.
 * @type {Ref<RealtimeChannel | undefined>}
 */
const channel: Ref<RealtimeChannel | undefined> = ref<RealtimeChannel>()

onMounted(() => {
/**
 * Retrieves the Ably channel corresponding to the chat item.
 * @type {RealtimeChannel}
 */
  channel.value = $ably.channels.get(`channel:${route.params.chat}`)
})

/**
 * Reactive state indicating if the current user is typing.
 * @type {Ref<boolean>}
 */
const isTyping: Ref<boolean> = ref<boolean>(false)

/**
 * Publishes a "typing" event to the Ably channel.
 * @param {string} event - The event type (e.g., 'event:start-typing', 'event:stop-typing').
 * @param {boolean} _isTyping - The current typing status.
 */
function typing(event: string, _isTyping: boolean) {
  channel.value?.publish(event, { user_id: user.value._id, is_typing: _isTyping })
}

/**
 * Debounced function that stops typing after a delay (1.5s).
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

/**
 * Reference to the file input element.
 * @type {Ref<HTMLInputElement | undefined>}
 */
const mediaInput: Ref<HTMLInputElement | undefined> = ref<HTMLInputElement>()

/**
 * Handles the change event of the file input.
 * Adds selected files to the list.
 */
async function onInputChange() {
  const _files = mediaInput.value?.files
  closePopover()
  if (!_files)
    return

  /**
   * Clears the list of existing files.
   */
  files.value.length = 0
  await addFiles(_files)
}

/**
 * Removes a file from the list by its index.
 * @param {number} index - Index of the file to remove.
 */
function onRemove(index: number) {
  files.value.splice(index, 1)
}

/**
 * Determines if all files have been uploaded.
 * @type {ComputedRef<boolean>}
 */
computed(() => files.value.every(f => f.status === 'done'))

/**
 * Sends the message, including the IDs of any uploaded attachments.
 */
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
    <WindowFooterTypeDefaultPreview
      v-for="(entry, index) in files"
      :key="index"
      :entry="entry"
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
            { icon: 'carbon:document-blank', label: 'Media & Files', onClick: () => mediaInput?.click() },
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

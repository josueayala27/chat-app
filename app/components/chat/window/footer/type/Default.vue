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

const isTyping = ref<boolean>(false)

function typing(event: string, _isTyping: boolean) {
  channel.value?.publish(event, { user_id: user.value._id, is_typing: _isTyping })
}

const debouncedFn = useDebounceFn(() => {
  isTyping.value = false
  typing('event:stop-typing', isTyping.value)
}, 1000)

function onInput() {
  if (!isTyping.value) {
    isTyping.value = true
    typing('event:start-typing', isTyping.value)
  }
  debouncedFn()
}
</script>

<template>
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
            { icon: 'carbon:image-copy', label: 'Photos & videos' },
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

<script lang="ts">
import type { ChatMessage } from '~/types/message'
import theme from '@/theme/window/messages/type/text'

interface WindowMessagesTypeTextProps extends ChatMessage {
  ui?: Partial<typeof theme.slots>
  status?: boolean
}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()

const isOwn = inject<boolean>('isOwn')

const ui = computed(() => theme({ isOwn, isTemp: props.status }))
</script>

<template>
  <div :class="ui.root({ class: props.ui?.root })">
    {{ content }}
  </div>
</template>

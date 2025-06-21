<script lang="ts">
import theme from '@/theme/window/messages/type/text'

interface WindowMessagesTypeTextProps {
  content: string
  ui?: Partial<typeof theme.slots>
}
</script>

<script lang="ts" setup>
const props = defineProps<WindowMessagesTypeTextProps>()

const isOwn = inject<boolean>('isOwn')

const ui = computed(() => theme({ isOwn }))
</script>

<template>
  <div :class="ui.root({ class: props.ui?.root })">
    {{ content }}
  </div>
</template>

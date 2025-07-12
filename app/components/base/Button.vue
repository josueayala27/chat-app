<script lang="ts">
import theme from '@/theme/button'

interface BaseButtonProps { ui?: Partial<typeof theme.slots>, content?: string, icon?: string, loading?: boolean }
</script>

<script lang="ts" setup>
const props = defineProps<BaseButtonProps>()

const ui = computed(() => {
  return theme({ variant: 'primary' })
})
</script>

<template>
  <button :disabled="loading" :class="[ui.base({ class: props.ui?.base })]">
    <span v-if="loading" :class="ui.loading({ class: props.ui?.loading })">
      <Icon size="20px" name="svg-spinners:3-dots-fade" />
    </span>

    <Icon v-if="icon" :name="icon" />

    <slot>
      {{ content }}
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ content?: string, ui?: Partial<typeof button.slots> }>()

const button = tv({
  slots: {
    base: 'bg-sky-500 hover:bg-sky-600 rounded-lg h-9 px-4 flex items-center justify-center text-white cursor-pointer text-sm duration-200',
  },
})

const { base } = button()
</script>

<template>
  <button :class="[base({ class: props.ui?.base })]">
    <slot>
      {{ content }}
    </slot>
  </button>
</template>

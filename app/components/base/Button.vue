<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ ui?: Partial<typeof button.slots>, content?: string, loading?: boolean }>()

const button = tv({
  slots: {
    base: 'bg-sky-500 hover:bg-sky-600 rounded-lg h-9 px-4 flex items-center justify-center text-white cursor-pointer text-sm duration-200',
  },
  variants: {
    primary: {
      base: '',
    },
    secondary: {
      base: 'bg-slate-100 hover:bg-slate-200 rounded-lg h-9 px-4 flex items-center justify-center text-slate-700 cursor-pointer text-sm duration-200',
    },
  },
})

const { base } = button()
</script>

<template>
  <button :class="[base({ class: props.ui?.base })]">
    <Icon v-if="loading" size="20px" name="svg-spinners:90-ring-with-bg" />

    <slot v-else>
      {{ content }}
    </slot>
  </button>
</template>

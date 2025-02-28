<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ active: boolean, class?: string }>()

const tag = tv({
  base: 'px-3 py-1 rounded-full cursor-pointer select-none',
  variants: {
    active: {
      true: 'bg-sky-500 text-white',
      false: 'bg-slate-100 hover:bg-slate-200',
    },
  },
})
</script>

<template>
  <button :class="[tag({ active, class: props.class })]">
    <slot />
  </button>
</template>

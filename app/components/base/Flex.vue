<script setup lang="ts">
import type { JSX } from 'vue/jsx-runtime'
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  class?: string | string[]
  direction?: keyof typeof flex.variants.direction
  align?: keyof typeof flex.variants.align
}>(), {
  direction: 'row',
  align: 'start',
})

defineSlots<{ default?: () => JSX.Element }>()

const flex = tv({
  base: 'flex',
  variants: {
    direction: {
      column: 'flex-col',
      row: 'flex-row',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
    },
  },
})
</script>

<template>
  <div :class="[flex({ class: props.class, direction: props.direction, align: props.align })]">
    <slot />
  </div>
</template>

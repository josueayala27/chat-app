<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from 'vue'
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  icon?: string
  size?: keyof Partial<typeof input.variants.size>
  ui?: Partial<typeof input.slots>
  type?: InputTypeHTMLAttribute
}>(), { size: 'medium' })

const model = defineModel()

const input = tv({
  slots: {
    root: 'flex items-center top-0 sticky',
    base: 'w-full pl-(--height) h-(--height) pr-3 bg-slate-100 border-slate-200 rounded-lg outline-none text-sm',
    icon: 'absolute top-0 left-0 h-full aspect-square grid place-items-center pointer-events-none',
  },
  variants: {
    size: {
      small: {
        root: '[--height:32px]',
      },
      medium: {
        root: '[--height:40px]',
      },
      large: {
        root: '[--height:48px]',
      },
    },
    icon: {
      true: { base: 'pl-(--height)' },
      false: { base: 'pl-3' },
    },
  },
})

const { root, base, icon } = input({ size: props.size, icon: !!props.icon })
</script>

<template>
  <div :class="[root({ class: props.ui?.root })]">
    <div v-if="props.icon" :class="[icon({ class: props.ui?.icon })]">
      <Icon :name="props.icon" />
    </div>

    <input v-model="model" :type="type || 'text'" placeholder="Search..." :class="[base({ class: props.ui?.base })]">
  </div>
</template>

<script lang="ts" setup>
import type { BaseMenuItemProps } from './Item.vue'
import { tv } from 'tailwind-variants'

const props = defineProps<{ ui?: Partial<typeof ui.slots>, items?: BaseMenuItemProps[] }>()

const ui = tv({
  slots: {
    base: 'bg-white/90 rounded-lg p-1 flex flex-col backdrop-blur-[10px] border border-slate-200 z-50 shadow-lg',
  },
})

const { base } = ui()
</script>

<template>
  <div :class="base({ class: props.ui?.base })">
    <slot>
      <BaseMenuItem v-for="(item, index) in items" :key="index" v-bind="item" />
    </slot>
  </div>
</template>

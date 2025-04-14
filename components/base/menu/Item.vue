<script lang="ts" setup>
import { tv } from 'tailwind-variants'

export interface BaseMenuItemProps { icon: string, label: string, ui?: Partial<typeof ui.slots>, onClick?: (e: Event) => void }

const props = defineProps<BaseMenuItemProps>()

const ui = tv({
  slots: {
    root: 'cursor-pointer hover:bg-slate-200/60 py-2 px-4 rounded-lg text-sm flex items-center gap-2 text-neutral-900',
  },
})

const { root } = ui()
</script>

<template>
  <div :class="root({ class: props.ui?.root })" @click="onClick">
    <Icon size="20px" class="size-5" :name="icon" />
    <BaseFont :content="label" />
  </div>
</template>

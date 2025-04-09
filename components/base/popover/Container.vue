<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ ui?: { base: string } }>()

const ui = tv({
  base: 'bg-white/90 rounded-lg p-1 flex flex-col backdrop-blur-[10px] border border-slate-200 z-50',
})
</script>

<template>
  <div :class="ui({ class: props.ui?.base })">
    <slot />
  </div>
</template>

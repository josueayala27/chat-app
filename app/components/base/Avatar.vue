<script setup lang="ts">
import { tv } from 'tailwind-variants'

withDefaults(defineProps<{ size?: number | string, ui?: Partial<typeof avatar.slots> }>(), { size: 48 })

const avatar = tv({
  slots: {
    base: 'size-(--avatar-size) bg-slate-100 rounded-full group-hover:bg-slate-200 shrink-0 relative',
  },
})

const { base } = avatar()
</script>

<template>
  <div
    :style="{ '--avatar-size': `${size}px` }"
    :class="base({ class: ui?.base })"
  >
    <slot />
  </div>
</template>

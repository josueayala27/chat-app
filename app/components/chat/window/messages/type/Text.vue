<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const ui = tv({
  slots: { root: 'py-2 px-3 max-w-[32rem]' },
})

const { root } = ui()
</script>

<template>
  <!-- rounded-r-lg last:rounded-bl-lg -->
  <div :class="root()">
    <BaseFont class="text-sm text-inherit">
      <slot />
    </BaseFont>
  </div>
</template>

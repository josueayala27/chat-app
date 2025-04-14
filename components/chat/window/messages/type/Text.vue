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
      Growing up in a particular neighborhood, growing up in a working-class family, not having much money, all of those things fire you and can give you an edge, can give you an anger.
    </BaseFont>
  </div>
</template>

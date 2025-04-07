<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: { root: 'py-2 px-3 rounded-lg max-w-[32rem]' },
  variants: {
    isOwn: {
      true: { root: 'bg-sky-500 text-white' },
      false: { root: 'bg-slate-100' },
    },
  },
})

const { root } = ui({ isOwn })
</script>

<template>
  <!-- rounded-r-lg last:rounded-bl-lg -->
  <div :class="root()">
    <BaseFont class="text-sm text-inherit">
      Growing up in a particular neighborhood, growing up in a working-class family, not having much money, all of those things fire you and can give you an edge, can give you an anger.
    </BaseFont>
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: { root: 'relative group rounded-lg' },
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
  <div :class="root()">
    <BasePopover :config="{ placement: isOwn ? 'bottom-end' : 'bottom-start' }">
      <div class="rounded-tr-lg absolute top-0 right-0 h-8 aspect-square flex items-center justify-center invisible group-hover:visible cursor-pointer bg-inherit">
        <Icon name="carbon:chevron-down" />
      </div>

      <template #content>
        <BaseMenuContainer>
          <BaseMenuItem icon="carbon:information" label="Message Info" />
          <BaseMenuItem icon="carbon:reply" label="Reply" />
          <BaseMenuItem icon="carbon:copy-file" label="Copy" />
          <BaseMenuItem icon="carbon:text-new-line" label="Forward" />
          <BaseMenuItem icon="carbon:pin" label="Pin" />
          <BaseMenuItem icon="carbon:star" label="Star" />
          <BaseMenuItem :ui="{ root: 'text-red-500' }" icon="carbon:trash-can" label="Delete" />
        </BaseMenuContainer>
      </template>
    </BasePopover>

    <slot />
  </div>
</template>

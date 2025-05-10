<script setup lang="ts">
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: {
    root: 'relative group flex items-center gap-2 w-full',
    base: 'rounded-lg',
  },
  variants: {
    isOwn: {
      true: {
        root: 'pr-[calc(48px+8px)] flex-row-reverse',
        base: 'bg-sky-500 text-white',
      },
      false: {
        root: 'pl-[calc(48px+8px)]',
        base: 'bg-slate-100',
      },
    },
  },
})

const { root, base } = ui({ isOwn })
</script>

<template>
  <div :class="[root()]">
    <!-- Message -->
    <div :class="[base()]">
      <slot />
    </div>

    <!-- Actions -->
    <div>
      <BasePopover :config="{ placement: isOwn ? 'bottom-end' : 'bottom-start' }">
        <template #default="{ isOpen }">
          <div
            :class="{ 'visible not-group-hover:bg-white bg-slate-200!': isOpen }"
            class="p-2 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center cursor-pointer invisible group-hover:visible"
          >
            <Icon size="20px" name="carbon:overflow-menu-horizontal" class="flex shrink-0" />
          </div>
        </template>

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
    </div>
  </div>
</template>

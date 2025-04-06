<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: {
    root: 'rounded-lg flex-col inline-flex w-[20rem]',
    radio: 'size-3 rounded-full shrink-0',
    bar: 'h-2 rounded-full w-full',
    button: 'w-full cursor-pointer p-3 duration-300 font-medium',
  },
  variants: {
    isOwn: {
      true: {
        root: 'bg-sky-500 text-white',
        radio: 'bg-sky-400',
        bar: 'bg-sky-400',
        button: 'hover:text-white/80',
      },
      false: {
        root: 'bg-slate-100',
        radio: 'bg-slate-300/50',
        bar: 'bg-slate-300/50',
        button: 'hover:text-slate-700',
      },
    },
  },
})

const { root, radio, bar, button } = ui({ isOwn })
</script>

<template>
  <div :class="root()">
    <div class="p-3 flex flex-col gap-4">
      <BaseFont class="text-sm text-inherit font-semibold" content="THIS IS MY POLL" />

      <div v-for="item in 3" :key="item" class="flex flex-col gap-2 cursor-pointer">
        <div class="flex items-center gap-2">
          <div :class="radio()" />
          <BaseFont class="text-sm text-inherit" :content="`This is a poll option ${item + 1}`" />
        </div>

        <div :class="bar()" />
      </div>
    </div>

    <button :class="button()">
      <BaseFont class="text-sm text-inherit" content="View votes" />
    </button>
  </div>
</template>

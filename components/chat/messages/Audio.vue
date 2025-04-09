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

const canvasRef = ref<HTMLCanvasElement | null>(null)

useWaveform(canvasRef, 'https://res.cloudinary.com/diobzajfw/video/upload/v1744237981/test/jsmsen0pmfip9fkwf9ib.mp3')
</script>

<template>
  <div :class="root({ class: 'w-[300px]' })">
    <canvas
      ref="canvasRef"
      class="w-full h-[30px]"
      :width="276"
      :height="30"
    />
  </div>
</template>

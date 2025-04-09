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

const { drawWaveform } = useWaveform(canvasRef, 'https://res.cloudinary.com/diobzajfw/video/upload/v1744237981/test/jsmsen0pmfip9fkwf9ib.mp3', {
  barColor: isOwn ? 'white' : 'oklch(37.2% 0.044 257.287)',
})

onMounted(() => {
  drawWaveform()
})
</script>

<template>
  <div :class="root()">
    <canvas ref="canvasRef" :width="276" :height="30" />
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')

const ui = tv({
  slots: { root: 'py-2 px-3 rounded-lg flex gap-2 items-center' },
  variants: {
    isOwn: {
      true: { root: 'bg-sky-500 text-white' },
      false: { root: 'bg-slate-100' },
    },
  },
})

const { root } = ui({ isOwn })

const canvasRef = ref<HTMLCanvasElement | null>(null)

const { drawWaveform } = useAudio(canvasRef, 'https://res.cloudinary.com/diobzajfw/video/upload/v1744237981/test/jsmsen0pmfip9fkwf9ib.mp3', {
  barColor: isOwn ? 'white' : 'oklch(37.2% 0.044 257.287)',
})

onMounted(async () => {
  drawWaveform()
})
</script>

<template>
  <div :class="root()">
    <div class="p-2 rounded-full bg-sky-500 grid place-items-center cursor-pointer">
      <Icon size="20px" name="carbon:play-filled-alt" class="flex shrink-0 text-white" />
    </div>
    <canvas ref="canvasRef" :width="200" :height="30" />
    <BaseFont content="0:04" class="text-xs" />
  </div>
</template>

<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import { onMounted, ref } from 'vue'

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

onMounted(() => {
  if (!canvasRef.value)
    return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  const updateCanvasSize = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }
  updateCanvasSize()

  const audioContext = new AudioContext()
  fetch('https://res.cloudinary.com/diobzajfw/video/upload/v1744237981/test/jsmsen0pmfip9fkwf9ib.mp3')
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then((audioBuffer) => {
      const data = audioBuffer.getChannelData(0)

      const config = {
        barWidth: 3,
        gap: 1,
        maxBars: Math.min(400, canvas.width / 4),
        minBarHeight: 2,
        borderRadius: 2,
        barColor: '#3b82f6',
        sensitivity: 3.5,
        maxVisualHeight: 0.85,
      }

      let maxAmplitude = 0
      for (let i = 0; i < data.length; i++) {
        maxAmplitude = Math.max(maxAmplitude, Math.abs(data[i]))
      }
      const adjustedMaxAmplitude = maxAmplitude / config.sensitivity

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = config.barColor

      const blockSize = Math.floor(data.length / config.maxBars)
      for (let i = 0; i < config.maxBars; i++) {
        const blockStart = i * blockSize
        let sum = 0

        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(data[blockStart + j])
        }
        const avg = sum / blockSize

        const boostedHeight = (avg / adjustedMaxAmplitude) * canvas.height
        const barHeight = Math.min(
          Math.max(boostedHeight, config.minBarHeight),
          canvas.height * config.maxVisualHeight,
        )

        const x = i * (config.barWidth + config.gap)
        const y = (canvas.height - barHeight) / 2

        ctx.beginPath()
        ctx.roundRect(x, y, config.barWidth, barHeight, config.borderRadius)
        ctx.fill()
      }
    })
    .catch(error => console.error('Error:', error))
})
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

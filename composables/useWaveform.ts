export interface WaveformConfig {
  barWidth?: number
  gap?: number
  maxBars?: number
  minBarHeight?: number
  borderRadius?: number
  barColor?: string
  sensitivity?: number
  maxVisualHeight?: number
}

const defaultConfig: WaveformConfig = {
  barWidth: 3,
  gap: 1,
  maxBars: 400,
  minBarHeight: 2,
  borderRadius: 2,
  barColor: '#3b82f6',
  sensitivity: 3.5,
  maxVisualHeight: 0.85,
}

export function useWaveform(canvasRef: Ref<HTMLCanvasElement | null>, audioUrl: string, config: WaveformConfig = {}) {
  const mergedConfig = { ...defaultConfig, ...config }
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const drawWaveform = async () => {
    if (!canvasRef.value)
      return

    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    try {
      const audioContext = new AudioContext()
      const response = await fetch(audioUrl)
      const buffer = await response.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(buffer)
      const data = audioBuffer.getChannelData(0)

      let maxAmplitude = 0
      for (let i = 0; i < data.length; i++) {
        maxAmplitude = Math.max(maxAmplitude, Math.abs(data[i]))
      }
      const adjustedMaxAmplitude = maxAmplitude / (mergedConfig.sensitivity ?? defaultConfig.sensitivity ?? 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = mergedConfig.barColor || defaultConfig.barColor || '#000'

      const dynamicMaxBars = Math.min(mergedConfig.maxBars ?? defaultConfig.maxBars ?? 0, canvas.width / 4)
      const blockSize = Math.floor(data.length / dynamicMaxBars)

      for (let i = 0; i < dynamicMaxBars; i++) {
        const blockStart = i * blockSize
        let sum = 0

        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(data[blockStart + j])
        }

        const avg = sum / blockSize
        const boostedHeight = (avg / adjustedMaxAmplitude) * canvas.height
        const barHeight = Math.min(
          Math.max(boostedHeight, mergedConfig.minBarHeight ?? defaultConfig.minBarHeight ?? 0),
          canvas.height * (mergedConfig.maxVisualHeight ?? defaultConfig.maxVisualHeight ?? 1),
        )

        const x = i * ((mergedConfig.barWidth ?? defaultConfig.barWidth ?? 0) + (mergedConfig.gap ?? defaultConfig.gap ?? 0))
        const y = (canvas.height - barHeight) / 2

        ctx.beginPath()
        ctx.roundRect(x, y, mergedConfig.barWidth!, barHeight, mergedConfig.borderRadius ?? defaultConfig.borderRadius ?? 0)
        ctx.fill()
      }

      isLoading.value = false
    }
    catch (err) {
      error.value = err as Error
      isLoading.value = false
    }
  }

  onMounted(drawWaveform)

  return {
    isLoading,
    error,
    redraw: drawWaveform,
  }
}

/**
 * Configuration options for the waveform visualization.
 */
interface WaveformConfig {
  barWidth?: number // The width of each bar in the waveform.
  gap?: number // The gap between bars in the waveform.
  maxBars?: number // The maximum number of bars to display.
  minBarHeight?: number // The minimum height of a bar.
  borderRadius?: number // The border radius of each bar.
  barColor?: string // The color of the bars.
  sensitivity?: number // The sensitivity of the waveform (affects amplitude scaling).
  maxVisualHeight?: number // The maximum height of the bars as a fraction of the canvas height.
}

/**
 * Default configuration for the waveform visualization.
 * @type {WaveformConfig}
 */
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

/**
 * A composable function to draw an audio waveform on a canvas element.
 *
 * @param {Ref<HTMLCanvasElement | null>} canvasRef - A Vue ref pointing to the canvas element where the waveform will be drawn.
 * @param {string} audioUrl - The URL of the audio file to visualize.
 * @param {WaveformConfig} [config] - Optional configuration for customizing the waveform visualization.
 * @returns {object} - An object containing reactive properties and methods:
 *   - `isLoading` {Ref<boolean>} - Indicates whether the waveform is currently being loaded.
 *   - `error` {Ref<Error | null>} - Holds any error that occurs during the waveform generation.
 *   - `redraw` {Function} - A function to manually redraw the waveform.
 */
export function useWaveform(canvasRef: Ref<HTMLCanvasElement | null>, audioUrl: string, config: WaveformConfig = {}): object {
  const mergedConfig = { ...defaultConfig, ...config }
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  /**
   * Draws the waveform on the canvas.
   * Fetches the audio file, decodes it, and visualizes the waveform based on the audio data.
   * @async
   * @returns {Promise<void>}
   */
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

      // Calculate the maximum amplitude for normalization
      let maxAmplitude = 0
      for (let i = 0; i < data.length; i++) {
        maxAmplitude = Math.max(maxAmplitude, Math.abs(data[i]))
      }
      const adjustedMaxAmplitude = maxAmplitude / (mergedConfig.sensitivity ?? defaultConfig.sensitivity ?? 1)

      // Clear the canvas and set the bar color
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = mergedConfig.barColor || defaultConfig.barColor || '#000'

      // Calculate the number of bars and block size
      const dynamicMaxBars = Math.min(mergedConfig.maxBars ?? defaultConfig.maxBars ?? 0, canvas.width / 4)
      const blockSize = Math.floor(data.length / dynamicMaxBars)

      // Draw each bar
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
        ctx.roundRect(
          x,
          y,
          mergedConfig.barWidth!,
          barHeight,
          mergedConfig.borderRadius ?? defaultConfig.borderRadius ?? 0,
        )
        ctx.fill()
      }

      isLoading.value = false
    }
    catch (err) {
      error.value = err as Error
      isLoading.value = false
    }
  }

  // Automatically draw the waveform when the component is mounted
  onMounted(drawWaveform)

  return {
    isLoading,
    error,
    redraw: drawWaveform,
  }
}

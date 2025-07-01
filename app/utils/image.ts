/**
 * Creates a square thumbnail (default 252 × 252 px) from an image file.
 *
 * The image is center-cropped so that the shorter edge defines the square,
 * then scaled down to the requested side length and encoded as JPEG.
 *
 * @param file - The original image file.
 * @param side - The side length of the square in pixels. Defaults to 84 × 3 = 252 px.
 * @param quality  JPEG quality between 0 and 1. Defaults to 0.7 (≈70 %).
 * @returns A promise that resolves to either an object-URL (modern browsers with `OffscreenCanvas.convertToBlob`) or a data-URL fallback.
 *
 * @example
 * ```ts
 * const thumbUrl = await createThumb(file);        // 252 px, 70 % quality
 * const tiny     = await createThumb(file, 96, 0.6); // 96 px, 60 % quality
 * imageElement.src = thumbUrl;                     // Display thumbnail
 * ```
 */
export async function createThumb(
  file: File,
  side: number = 84 * 3,
  quality: number = 0.7,
): Promise<string> {
  const img = await createImageBitmap(file)

  const crop = Math.min(img.width, img.height)
  const sx = (img.width - crop) / 2 // X offset
  const sy = (img.height - crop) / 2 // Y offset

  const Canvas = (globalThis as any).OffscreenCanvas || HTMLCanvasElement
  const canvas: HTMLCanvasElement | OffscreenCanvas = new Canvas(side, side) as any
  const ctx = canvas.getContext('2d')!

  ctx.drawImage(img, sx, sy, crop, crop, 0, 0, side, side)
  img.close()

  return (canvas as any).convertToBlob
    ? URL.createObjectURL(await (canvas as any).convertToBlob({ type: 'image/jpeg', quality }))
    : (canvas as HTMLCanvasElement).toDataURL('image/jpeg', quality)
}

export function getImageDimensionsFromFile(file: File): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Preloads an image by creating an HTMLImageElement and resolving when it's ready.
 *
 * @param src - URL of the image to preload.
 * @returns A promise that resolves with the loaded image element or rejects on error.
 */
export function preload(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

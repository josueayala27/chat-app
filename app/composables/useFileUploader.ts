export interface UploadFileEntry {
  _id?: string
  file: File
  status: 'idle' | 'uploading' | 'done' | 'error'

  // Only for images
  source?: string
  content_type: string
  meta?: Record<string, any>
}

export function useFileUploader(chatId: string) {
  const files = ref<UploadFileEntry[]>([])
  const { create: createAttachment, uploadFile } = useAttachment(chatId)

  function updateFileEntry(file: File, updates: Partial<UploadFileEntry>) {
    const entry = files.value.find(f => f.file === file)
    if (entry)
      Object.assign(entry, updates)
  }

  async function prepareAttachmentInput(file: File) {
    const sha256 = await computeSHA256(file)

    return {
      content_type: file.type,
      file_name: file.name,
      sha256,
      size: file.size,
      meta: await getImageDimensionsFromFile(file),
    }
  }

  async function computeSHA256(file: File): Promise<string> {
    const arrayBuf = await file.arrayBuffer()
    const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuf)
    return [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('')
  }

  async function uploadSingleFile(file: File) {
    const input = await prepareAttachmentInput(file)
    const { upload_url, _id } = await createAttachment(input)

    updateFileEntry(file, { _id })

    if (upload_url) {
      await uploadFile(upload_url, file)
    }

    updateFileEntry(file, { status: 'done' })
  }

  return { files, uploadSingleFile }
}

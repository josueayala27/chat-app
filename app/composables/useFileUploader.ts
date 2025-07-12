import type { Attachment } from '~/types/attachment'
import { random } from 'nanoid'
import { createThumb, getImageDimensionsFromFile } from '~/utils/image'

export type UploadStatus = 'pending' | 'uploading' | 'done' | 'error'

export interface UploadFileEntry extends Pick<Attachment, '_id' | 'key' | 'file_name'> {
  file: File
  status: UploadStatus
  /**
   * Local thumbnail preview for images.
   */
  src?: string
}

/**
 * Compute a SHA-256 hash of the given file and return it as a hex string.
 *
 * @param file - The File to hash.
 * @returns The hex encoded SHA-256 digest.
 */
async function computeSHA256(file: File): Promise<string> {
  console.log('🔢 [useFileUploader] computing SHA-256 for', file.name)
  const arrayBuf = await file.arrayBuffer()
  const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuf)
  const digest = [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('')
  console.log('✅ [useFileUploader] SHA-256 computed for', file.name)
  return digest
}

/**
 * Provides reactive file uploads for a given chat.
 *
 * @param chatId - ID of the chat where attachments will be uploaded.
 */
export function useFileUploader(chatId: string) {
  const files = ref<UploadFileEntry[]>([])
  const { enqueue } = useUploadQueue()
  const { createAttachment, uploadFile } = useAttachment(chatId)

  /**
   * Update a stored file entry with new values.
   *
   * @param file - The file whose entry should be updated.
   * @param updates - Partial updates to apply to the entry.
   */
  function updateFileEntry(file: File, updates: Partial<UploadFileEntry>) {
    const entry = files.value.find(f => f.file === file)
    if (entry) {
      Object.assign(entry, updates)
      console.log('✏️ [useFileUploader] updated entry', entry.file_name, updates)
    }
  }

  /**
   * Upload a single prepared entry and update its status.
   *
   * @param entry - The file entry to upload.
   */
  async function upload(entry: UploadFileEntry) {
    console.log('⬆️ [useFileUploader] starting upload for', entry.file_name)
    updateFileEntry(entry.file, { status: 'uploading' })

    try {
      let meta: any
      let src: string | undefined

      if (entry.file.type.startsWith('image/'))
        meta = await getImageDimensionsFromFile(entry.file)

      console.log('📡 [useFileUploader] creating attachment for', entry.file_name)
      const { upload_url, _id, key } = await createAttachment({
        content_type: entry.file.type,
        file_name: entry.file_name,
        sha256: await computeSHA256(entry.file),
        size: entry.file.size,
        meta,
      })

      if (upload_url) {
        console.log('🚀 [useFileUploader] uploading file', entry.file_name)
        await uploadFile({ upload_url, file: entry.file })
      }

      if (entry.file.type.startsWith('image/')) {
        const dynamicObject = (width: number, height: number) => buildURL(key, { resize: { width, height } })
        src = dynamicObject(84 * 3, 84 * 3)

        await preload(src).catch(() => {})
        await preload(dynamicObject(128 * 3, 128 * 3)).catch(() => {})
      }

      updateFileEntry(entry.file, {
        status: 'done',
        _id,
        key,
        ...(entry.file.type.startsWith('image/') ? { src } : {}),
      })
      console.log('✅ [useFileUploader] upload finished for', entry.file_name)
    }
    catch (err) {
      console.error('❌ [useFileUploader] upload failed for', entry.file_name, err)
      updateFileEntry(entry.file, { status: 'error' })
    }
  }

  /**
   * Build an upload entry from a raw File, generating a preview if needed.
   *
   * @param file - The file to convert to an UploadFileEntry.
   * @returns The prepared entry.
   */
  async function prepareEntry(file: File): Promise<UploadFileEntry> {
    console.log('🎁 [useFileUploader] preparing entry for', file.name)
    const isImage = file.type.startsWith('image/')
    const entry: UploadFileEntry = {
      _id: ['temp', random(32)].join('-'),
      key: ['temp'].join(''),
      file,
      file_name: file.name,
      status: 'pending',
    }

    if (isImage) {
      console.log('🖼️ [useFileUploader] generating thumbnail for', file.name)
      entry.src = await createThumb(file)
    }

    console.log('📦 [useFileUploader] entry ready for', file.name)
    return entry
  }

  /**
   * Adds a list of files to the upload queue.
   *
   * @param fileList - The FileList from an <input type="file"> element.
   * @returns An array of reactive upload entries.
   */
  async function addFiles(fileList: FileList | File[]): Promise<UploadFileEntry[]> {
    console.log('➕ [useFileUploader] adding files', fileList)
    const entries = await Promise.all([...fileList].map(file => prepareEntry(file)))
    files.value.push(...entries)

    entries.forEach((entry) => {
      console.log('📥 [useFileUploader] queued', entry.file_name)
      enqueue(() => upload(entry))
    })

    return entries
  }

  return { files, addFiles, updateFileEntry }
}

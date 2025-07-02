import { random } from 'nanoid'
import { createThumb, getImageDimensionsFromFile } from '~/utils/image'

export type UploadStatus = 'pending' | 'uploading' | 'done' | 'error'

export interface UploadFileEntry {
  file: File
  file_name: string
  status: UploadStatus

  _id?: string
  /**
   * Used to build the URL once uploaded.
   */
  key?: string
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
  const arrayBuf = await file.arrayBuffer()
  const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuf)
  return [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('')
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
    if (entry)
      Object.assign(entry, updates)
  }

  /**
   * Upload a single prepared entry and update its status.
   *
   * @param entry - The file entry to upload.
   */
  async function upload(entry: UploadFileEntry) {
    updateFileEntry(entry.file, { status: 'uploading' })

    try {
      let meta: any
      if (entry.file.type.startsWith('image/'))
        meta = await getImageDimensionsFromFile(entry.file)

      const { upload_url, _id, key } = await createAttachment({
        content_type: entry.file.type,
        file_name: entry.file_name,
        sha256: await computeSHA256(entry.file),
        size: entry.file.size,
        meta,
      })

      if (upload_url) {
        await uploadFile({ upload_url, file: entry.file })
      }

      updateFileEntry(entry.file, { status: 'done', _id, key })
    }
    catch (err) {
      console.error(err)
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
    const isImage = file.type.startsWith('image/')
    const entry: UploadFileEntry = {
      _id: ['temp', random(32)].join('-'),
      file,
      file_name: file.name,
      status: 'pending',
    }

    if (isImage)
      entry.src = await createThumb(file)

    return entry
  }

  /**
   * Adds a list of files to the upload queue.
   *
   * @param fileList - The FileList from an <input type="file"> element.
   * @returns An array of reactive upload entries.
   */
  async function addFiles(fileList: FileList | File[]): Promise<UploadFileEntry[]> {
    const entries = await Promise.all([...fileList].map(file => prepareEntry(file)))
    files.value.push(...entries)

    entries.forEach(entry => enqueue(() => upload(entry)))

    return entries
  }

  return { files, addFiles, updateFileEntry }
}

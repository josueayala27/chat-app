export interface UploadFileEntry {
  file: File
  status: 'uploading' | 'done' | 'error'
  file_name: string

  _id?: string
  /**
   * Used to build the URL.
   */
  key?: string
  src?: string
}

export function useFileUploader() {
  const files = ref<UploadFileEntry[]>([])

  function updateFileEntry(file: File, updates: Partial<UploadFileEntry>) {
    const entry = files.value.find(f => f.file === file)
    if (entry)
      Object.assign(entry, updates)
  }

  return { files, updateFileEntry }
}
